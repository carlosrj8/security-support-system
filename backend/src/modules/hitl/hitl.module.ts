import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HitlController } from './hitl.controller';
import { HitlService } from './hitl.service';
import { HitlRequest } from './entities/hitl-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HitlRequest]),
  ],
  controllers: [HitlController],
  providers: [HitlService],
  exports: [HitlService],
})
export class HitlModule {}
