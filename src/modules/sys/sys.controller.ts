import { Controller, Delete, Get, Param, Post, Put, Header } from '@nestjs/common';
import { SysService } from './sys.service';

@Controller('sys')
export class SysController {

    constructor(private readonly sysService: SysService) { }

    @Get('update-list')
    async updateList(): Promise<boolean> {
        return await this.sysService.updateList();
    }

    @Get('update-list-info')
    @Header('content-type', 'application/json')
    async updateListInfo(): Promise<string> {
        // return await this.sysService.updateListInfo();
        return await this.sysService.updateSymbolTickData('aircoins', 1607289536, 1609877537);
    }
}
