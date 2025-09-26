import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, IsArray } from 'class-validator';
import { HitlRequestType } from '../schemas/hitl-request.schema';
import { AgentType } from '../../agent/schemas/agent.schema';

export class CreateHitlRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(HitlRequestType)
  type: HitlRequestType;

  @IsEnum(AgentType)
  requestingAgent: AgentType;

  @IsString()
  @IsNotEmpty()
  requestingAgentId: string;

  @IsMongoId()
  @IsOptional()
  relatedCaseId?: string;

  @IsMongoId()
  @IsOptional()
  relatedClientId?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsObject()
  @IsOptional()
  context?: Record<string, any>;

  @IsObject()
  proposedAction: {
    action: string;
    parameters: Record<string, any>;
    reasoning: string;
  };

  @IsArray()
  @IsOptional()
  suggestions?: string[];
}
