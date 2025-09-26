import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Agent } from '../../agent/entities/agent.entity';
import { Client } from '../../client/entities/client.entity';

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

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({
    type: 'enum',
    enum: CaseType,
  })
  type: CaseType;

  @Column({
    type: 'enum',
    enum: CaseStatus,
    default: CaseStatus.CREATED,
  })
  status: CaseStatus;

  @Column({
    type: 'enum',
    enum: CasePriority,
    default: CasePriority.MEDIUM,
  })
  priority: CasePriority;

  @Column({ type: 'uuid', nullable: true })
  assignedTo?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  assignedToType?: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ type: 'jsonb', nullable: true })
  details: Record<string, any>;

  @Column({ type: 'jsonb', default: [] })
  history: Array<{
    message: string;
    from: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }>;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt?: Date;

  @Column({ type: 'integer', nullable: true })
  resolutionTime?: number; // in minutes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
