import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from '../agent/agent.module';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { Case } from './entities/case.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Case]),
    AgentModule,
  ],
  controllers: [CaseController],
  providers: [CaseService],
  exports: [CaseService],
})
export class CaseModule {}
