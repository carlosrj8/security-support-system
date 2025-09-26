import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateCaseDto } from './create-case.dto';
import { CaseStatus } from '../schemas/case.schema';
import { AgentType } from '../../agent/schemas/agent.schema';

export class UpdateCaseDto extends PartialType(CreateCaseDto) {
  @IsEnum(CaseStatus)
  @IsOptional()
  status?: CaseStatus;

  @IsString()
  @IsOptional()
  updatedBy?: string;

  @IsEnum(AgentType)
  @IsOptional()
  updatedByType?: AgentType;
}
