import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AgentDocument = Agent & Document;

export enum AgentType {
  CLIENT = 'client',
  TECHNICIAN = 'technician',
  VALIDATOR = 'validator',
  HITL = 'hitl',
  SYSTEM = 'system',
}

export enum AgentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  TRAINING = 'training',
  MAINTENANCE = 'maintenance',
}

@Schema({ timestamps: true })
export class Agent {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  agentId: string;

  @Prop({ type: String, enum: AgentType, required: true })
  type: AgentType;

  @Prop({ type: String, enum: AgentStatus, default: AgentStatus.ACTIVE })
  status: AgentStatus;

  @Prop({ type: Object })
  configuration: Record<string, any>;

  @Prop({ type: Object })
  capabilities: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  lastActive: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agent' })
  parentAgentId?: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
