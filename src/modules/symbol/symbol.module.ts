import { Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymbolController } from './symbol.controller';
import { SysService } from '../sys/sys.service';
import { Symbol } from 'src/entities/symbol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Symbol])],
  providers: [SymbolService, SysService],
  controllers: [SymbolController]
})
export class SymbolModule {}
