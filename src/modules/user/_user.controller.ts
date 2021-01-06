import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('rest/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(':offset')
    getList(@Param('offset') offset?: number): string {
        return 'getList';
    }

    @Get(':id')
    getById(@Param('id') id: string): string {
        return 'getById';
    }

    @Post()
    create(): string {
        return 'create';
    }

    @Put(':id')
    update(@Param('id') id: string): string {
        return 'update';
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return 'remove';
    }
}
