import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ISymbol } from 'src/interfaces/symbol.intarface';

export class CoingeckoService {
    static baseApiUrl = 'https://api.coingecko.com/api/v3/';

    static async getList(): Promise<ISymbol[]> {
        try {
            const symbolsList: AxiosResponse = await axios({
                method: 'GET',
                url: `${CoingeckoService.baseApiUrl}coins/list`,
                timeout: 10000,
            });
            if (!CoingeckoService.listResponseIsValid(symbolsList.data)) {
                throw new Error("...");
            }
            return symbolsList.data;
        } catch (ex) {
            throw ex;
        }
    }

    static listResponseIsValid(res: Array<ISymbol>): boolean {
        if (typeof res !== 'object' || !res.length) {
            return false;
        }
        for (let symb of res) {
            if (symb.id === undefined || symb.symbol === undefined || symb.name === undefined) {
                return false;
            }
        }
        return true;
    }

    static async getSymbolInfo(coingeckoId: string): Promise<Object> {
        try {
            const symbolInfo: AxiosResponse = await axios({
                method: 'GET',
                url: `${CoingeckoService.baseApiUrl}coins/${coingeckoId}`,
                timeout: 10000,
            });
            return {
                logo: !symbolInfo.data.image.large ? null : symbolInfo.data.image.large,
                homepage: !symbolInfo.data.links.homepage[0] ? null : symbolInfo.data.links.homepage[0],
            };
        } catch (ex) {
            throw ex;
        }
    }

    static async getTickData(coingeckoId: string, ttampFrom: number, ttampTo: number): Promise<Array<Array<number>>> {
        try {
            const symbolData: AxiosResponse = await axios({
                method: 'GET',
                url: `${CoingeckoService.baseApiUrl}coins/${coingeckoId}/market_chart/range?vs_currency=usd&from=${ttampFrom}&to=${ttampTo}`,
                timeout: 10000,
            });
            return symbolData.data.prices;
        } catch (ex) {
            throw ex;
        }
    }
}