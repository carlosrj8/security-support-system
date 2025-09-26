import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { AgentType, AgentStatus } from '../entities/agent.entity';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  agentId: string;

  @IsEnum(AgentType)
  type: AgentType;

  @IsEnum(AgentStatus)
  @IsOptional()
  status?: AgentStatus;

  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;

  @IsObject()
  @IsOptional()
  capabilities?: Record<string, any>;
}
