import { Query, Controller, Get, Header, Param } from '@nestjs/common';
import { SymbolListDto, SymbolMarketChartRangeDto } from './symbol.dto';
import { SymbolService } from './symbol.service';
import { Symbol } from 'src/entities/symbol.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { IEntityTickerClass } from 'src/entities/tickTable.entity';

@Controller('coins')
export class SymbolController {

    constructor(private readonly symbolService: SymbolService) { }

    @Get('list')
    @Header('content-type', 'application/json')
    getList(@Query() query: SymbolListDto): Promise<Pagination<Symbol>> {
        return this.symbolService.getList(query);
    }

    @Get(':coingeckoId')
    @Header('content-type', 'application/json')
    getByCoingeckoId(@Param('coingeckoId') coingeckoId: string): Promise<Symbol> {
        return this.symbolService.getByCoingeckoId(coingeckoId);
    }

    @Get(':coingeckoId/market_chart/range')
    @Header('content-type', 'application/json')
    getByCoingeckoIdMarketChartRange(
        @Query() query: SymbolMarketChartRangeDto,
        @Param('coingeckoId') coingeckoId: string
    ): Promise<IEntityTickerClass[]> | null {
        return this.symbolService.getByCoingeckoIdMarketChartRange(coingeckoId);
    }
}
