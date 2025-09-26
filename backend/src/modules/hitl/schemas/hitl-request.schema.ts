import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AgentType } from '../../agent/schemas/agent.schema';

export type HitlRequestDocument = HitlRequest & Document;

export enum HitlRequestStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum HitlRequestType {
  DECISION_APPROVAL = 'decision_approval',
  MANUAL_UPDATE = 'manual_update',
  ESCALATION = 'escalation',
  CONFIGURATION_CHANGE = 'configuration_change',
}

@Schema({ timestamps: true })
export class HitlRequest {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: HitlRequestType, required: true })
  type: HitlRequestType;

  @Prop({ type: String, enum: HitlRequestStatus, default: HitlRequestStatus.PENDING })
  status: HitlRequestStatus;

  @Prop({ type: String, enum: AgentType, required: true })
  requestingAgent: AgentType;

  @Prop({ required: true })
  requestingAgentId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Case' })
  relatedCaseId?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
  relatedClientId?: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object })
  context: Record<string, any>;

  @Prop({ type: Object })
  proposedAction: {
    action: string;
    parameters: Record<string, any>;
    reasoning: string;
  };

  @Prop([String])
  suggestions: string[];

  @Prop({ type: String })
  humanResponse?: string;

  @Prop({ type: Object })
  humanDecision?: {
    approved: boolean;
    modifications?: Record<string, any>;
    feedback: string;
    decidedBy: string;
    decidedAt: Date;
  };

  @Prop({ type: Date })
  expiresAt: Date;

  @Prop([{
    message: String,
    from: String,
    timestamp: { type: Date, default: Date.now },
    metadata: Object,
  }])
  conversation: Array<{
    message: string;
    from: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;
}

export const HitlRequestSchema = SchemaFactory.createForClass(HitlRequest);
