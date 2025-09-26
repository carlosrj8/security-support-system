import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { CasePriority, CaseType } from '../schemas/case.schema';
import { AgentType } from '../../agent/schemas/agent.schema';

export class CreateCaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(CaseType)
  type: CaseType;

  @IsEnum(CasePriority)
  @IsOptional()
  priority?: CasePriority;

  @IsMongoId()
  clientId: string;

  @IsString()
  createdBy: string;

  @IsString()
  createdByType: AgentType;

  @IsObject()
  @IsOptional()
  details?: Record<string, any>;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}
