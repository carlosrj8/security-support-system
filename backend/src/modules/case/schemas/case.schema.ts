import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AgentType } from '../../agent/schemas/agent.schema';

export type CaseDocument = Case & Document;

export enum CaseStatus {
  CREATED = 'created',
  IN_PROGRESS = 'in_progress',
  WAITING_CUSTOMER = 'waiting_customer',
  WAITING_TECHNICIAN = 'waiting_technician',
  RESOLVED = 'resolved',
  CANCELLED = 'cancelled',
}

export enum CasePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum CaseType {
  CAMERA_OFFLINE = 'camera_offline',
  ALARM_ISSUE = 'alarm_issue',
  ACCESS_CONTROL = 'access_control',
  INTERCOM = 'intercom',
  NETWORK = 'network',
  FINANCIAL = 'financial',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class Case {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: CaseType, required: true })
  type: CaseType;

  @Prop({ type: String, enum: CaseStatus, default: CaseStatus.CREATED })
  status: CaseStatus;

  @Prop({ type: String, enum: CasePriority, default: CasePriority.MEDIUM })
  priority: CasePriority;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agent' })
  assignedTo?: string;

  @Prop({ type: String, enum: AgentType })
  assignedToType?: AgentType;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agent' })
  createdBy: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
  clientId: string;

  @Prop({ type: Object })
  details: Record<string, any>;

  @Prop([{ 
    message: String, 
    from: { type: String, enum: AgentType },
    timestamp: { type: Date, default: Date.now },
    metadata: Object
  }])
  history: Array<{
    message: string;
    from: AgentType;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;

  @Prop({ type: Date })
  resolvedAt?: Date;

  @Prop({ type: Number })
  resolutionTime?: number; // in minutes
}

export const CaseSchema = SchemaFactory.createForClass(Case);
