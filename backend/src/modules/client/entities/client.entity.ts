import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Case } from '../../case/entities/case.entity';

export enum ClientType {
  BAR = 'bar',
  RESTAURANT = 'restaurant',
  STORE = 'store',
  CONDOMINIUM = 'condominium',
  OFFICE = 'office',
  OTHER = 'other',
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  clientId: string;

  @Column({
    type: 'enum',
    enum: ClientType,
  })
  type: ClientType;

  @Column({
    type: 'enum',
    enum: ClientStatus,
    default: ClientStatus.ACTIVE,
  })
  status: ClientStatus;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'jsonb' })
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @Column({ type: 'jsonb' })
  contact: {
    primaryName: string;
    primaryPhone: string;
    primaryEmail: string;
    secondaryName?: string;
    secondaryPhone?: string;
    secondaryEmail?: string;
  };

  @Column({ type: 'jsonb', default: [] })
  equipment: Array<{
    id: string;
    type: 'camera' | 'alarm' | 'access_control' | 'intercom' | 'network';
    description: string;
    location: string;
    serialNumber: string;
    installDate: Date;
    lastMaintenance?: Date;
    status: 'active' | 'inactive' | 'maintenance';
    metadata?: Record<string, any>;
  }>;

  @Column({ type: 'jsonb', nullable: true })
  technicalRecord: {
    installationDate: Date;
    lastVisit?: Date;
    totalVisits: number;
    commonIssues: string[];
    notes: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  contractInfo: {
    contractNumber: string;
    startDate: Date;
    endDate?: Date;
    serviceLevel: 'basic' | 'premium' | 'enterprise';
    monthlyFee: number;
  };

  @OneToMany(() => Case, (caseEntity) => caseEntity.client)
  cases: Case[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
