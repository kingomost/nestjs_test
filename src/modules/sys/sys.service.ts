import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { Symbol } from 'src/entities/symbol.entity';
import { ConnectionService, createEntity, IEntityTickerClass } from 'src/entities/tickTable.entity';
import { CoingeckoService } from 'src/externalServices/CoingeckoService';
import { ISymbol } from 'src/interfaces/symbol.intarface';
import { Repository } from 'typeorm';

@Injectable()
export class SysService {
    constructor(@InjectRepository(Symbol) private symbolRepository: Repository<Symbol>) { }

    async updateList(): Promise<boolean> {
        try {
            const symbolsList: ISymbol[] = await CoingeckoService.getList();
            for (let symb of symbolsList) {
                const symbInDB: Symbol = await this.symbolRepository.findOne({
                    where: [
                        { coingeckoId: symb.id },
                        { symbol: symb.symbol },
                        { name: symb.name },
                    ]
                });
                if (symbInDB) {
                    continue;
                }
                const newSymb: Symbol = this.symbolRepository.create({
                    coingeckoId: symb.id,
                    symbol: symb.symbol,
                    name: symb.name
                });
                await this.symbolRepository.save(newSymb);
            }
            return true;
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }

    async updateSymbolInfo(coingeckoId: string): Promise<string> {
        try {
            const symb: Symbol = await this.symbolRepository.findOne({ coingeckoId });
            if (!symb) {
                throw new Error(`${coingeckoId} not found`);
            }
            const symbInfo: Object = await CoingeckoService.getSymbolInfo(coingeckoId);
            for (let key in symbInfo) {
                symb[key] = symbInfo[key];
            }
            await this.symbolRepository.save(symbInfo);
            return "";
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }

    async updateSymbolTickData(coingeckoId: string, ttampFrom?: number, ttampTo?: number): Promise<string> {
        try {
            const symb: Symbol = await this.symbolRepository.findOne({ coingeckoId });
            if (!symb) {
                throw new Error(`${coingeckoId} not found`);
            }
            if ((ttampFrom && ttampTo && ttampFrom >= ttampTo) || (ttampFrom && ttampFrom >= Date.now())) {
                throw new Error(`${coingeckoId} not valid ttamp range`);
            }

            const tickData: Array<Array<number>> = await CoingeckoService.getTickData(
                coingeckoId,
                ttampFrom ? ttampFrom : Date.now() - 1000 * 60 * 60 * 24,
                ttampTo ? ttampTo : Date.now()
            );

            // const EntityA = createEntity("symbTicksTableName");
            // const connectionA = await ConnectionService.getConnection(EntityA);
            // let repositoryA = connectionA.getRepository(EntityA);

            // const testingA: IEntityClass = await repositoryA.create();
            // testingA.name = "hello-world";
            // testingA.value = 234;
            // await repositoryA.save(testingA);
            return tickData.toString();
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }

    async updateListInfo(): Promise<string> {
        try {
            const allSymbols: Symbol[] = await this.symbolRepository.find();
            for (let symb of allSymbols) {
                const a: AxiosResponse = await axios({
                    method: 'GET',
                    // url: `https://api.coingecko.com/api/v3/coins/${symb.coingeckoId}`,
                    // url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/tickers`,
                    // url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/history?date=30-12-2020`,
                    // url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/market_chart?vs_currency=usd&days=30`,
                    url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/market_chart/range?vs_currency=usd&from=1607289536&to=1609877537`,
                    // url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/status_updates`,
                    // url: `https://api.coingecko.com/api/v3//coins/${symb.coingeckoId}/ohlc?vs_currency=usd&days=30`,
                    timeout: 10000,
                });
                console.log('A----------');
                console.log(a.data);
                return a.data;
                break;
            }
            return "";
        } catch (ex) {
            console.log("ERROR!!!!!!");
            throw ex;
        }
    }
}