import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';

import { Symbol } from 'src/entities/symbol.entity';
import { SymbolListDto } from './symbol.dto';
import { IEntityTickerClass } from 'src/entities/tickTable.entity';

@Injectable()
export class SymbolService {
    constructor(@InjectRepository(Symbol) private symbolRepository: Repository<Symbol>) { }

    async getList(query: SymbolListDto): Promise<Pagination<Symbol>> {
        try {
            const queryBuilder = this.symbolRepository.createQueryBuilder()
                .orderBy('priority', 'DESC')
                .orderBy('id', 'ASC')
                .where({ isActive: true });
            return await paginate<Symbol>(queryBuilder, {
                page: query.page ? query.page : 1,
                limit: query.limit ? query.limit : 100000
            });
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }

    async getByCoingeckoId(coingeckoId: string): Promise<Symbol> {
        try {
            return await await this.symbolRepository.findOne({ coingeckoId });
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }

    async getByCoingeckoIdMarketChartRange(coingeckoId: string): Promise<IEntityTickerClass[]> | null {
        try {
            return null;
            // return await await this.symbolRepository.findOne({ coingeckoId });
        } catch (ex) {
            // LOGGER
            throw ex;
        }
    }
}
