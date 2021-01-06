import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysService } from './sys.service';
import { SysController } from './sys.controller';
import { User } from 'src/entities/user.entity';
import { Symbol } from 'src/entities/symbol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Symbol])],
  providers: [SysService],
  controllers: [SysController]
})
export class SysModule { }
