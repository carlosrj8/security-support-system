import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

@Entity('hitl_requests')
export class HitlRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({
    type: 'enum',
    enum: HitlRequestType,
  })
  type: HitlRequestType;

  @Column({
    type: 'enum',
    enum: HitlRequestStatus,
    default: HitlRequestStatus.PENDING,
  })
  status: HitlRequestStatus;

  @Column({ type: 'varchar', length: 50 })
  requestingAgent: string;

  @Column({ type: 'varchar', length: 100 })
  requestingAgentId: string;

  @Column({ type: 'uuid', nullable: true })
  relatedCaseId?: string;

  @Column({ type: 'uuid', nullable: true })
  relatedClientId?: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  context: Record<string, any>;

  @Column({ type: 'jsonb' })
  proposedAction: {
    action: string;
    parameters: Record<string, any>;
    reasoning: string;
  };

  @Column({ type: 'jsonb', default: [] })
  suggestions: string[];

  @Column({ type: 'text', nullable: true })
  humanResponse?: string;

  @Column({ type: 'jsonb', nullable: true })
  humanDecision?: {
    approved: boolean;
    modifications?: Record<string, any>;
    feedback: string;
    decidedBy: string;
    decidedAt: Date;
  };

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'jsonb', default: [] })
  conversation: Array<{
    message: string;
    from: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
