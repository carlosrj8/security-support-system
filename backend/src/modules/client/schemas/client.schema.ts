import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

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

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  clientId: string;

  @Prop({ type: String, enum: ClientType, required: true })
  type: ClientType;

  @Prop({ type: String, enum: ClientStatus, default: ClientStatus.ACTIVE })
  status: ClientStatus;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Object })
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @Prop({ type: Object })
  contact: {
    primaryName: string;
    primaryPhone: string;
    primaryEmail: string;
    secondaryName?: string;
    secondaryPhone?: string;
    secondaryEmail?: string;
  };

  @Prop([{
    type: { type: String, enum: ['camera', 'alarm', 'access_control', 'intercom', 'network'] },
    description: String,
    location: String,
    serialNumber: String,
    installDate: Date,
    lastMaintenance: Date,
    status: { type: String, enum: ['active', 'inactive', 'maintenance'], default: 'active' },
    metadata: Object,
  }])
  equipment: Array<{
    type: 'camera' | 'alarm' | 'access_control' | 'intercom' | 'network';
    description: string;
    location: string;
    serialNumber: string;
    installDate: Date;
    lastMaintenance?: Date;
    status: 'active' | 'inactive' | 'maintenance';
    metadata?: Record<string, any>;
  }>;

  @Prop({ type: Object })
  technicalRecord: {
    installationDate: Date;
    lastVisit?: Date;
    totalVisits: number;
    commonIssues: string[];
    notes: string[];
  };

  @Prop({ type: Object })
  contractInfo: {
    contractNumber: string;
    startDate: Date;
    endDate?: Date;
    serviceLevel: 'basic' | 'premium' | 'enterprise';
    monthlyFee: number;
  };
}

export const ClientSchema = SchemaFactory.createForClass(Client);
