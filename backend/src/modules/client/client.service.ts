import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument, ClientStatus } from './schemas/client.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const clientId = this.generateClientId();
    const createdClient = new this.clientModel({
      ...createClientDto,
      clientId,
      technicalRecord: {
        installationDate: new Date(),
        totalVisits: 0,
        commonIssues: [],
        notes: [],
      },
    });
    return createdClient.save();
  }

  async findAll(filter: Partial<Client> = {}): Promise<Client[]> {
    return this.clientModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async findByClientId(clientId: string): Promise<Client> {
    const client = await this.clientModel.findOne({ clientId }).exec();
    if (!client) {
      throw new NotFoundException(`Client with clientId ${clientId} not found`);
    }
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(id, updateClientDto, { new: true })
      .exec();
    
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return updatedClient;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.clientModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async addEquipment(clientId: string, equipment: any): Promise<Client> {
    const client = await this.findOne(clientId);
    client.equipment.push(equipment);
    return client.save();
  }

  async updateTechnicalRecord(
    clientId: string, 
    update: Partial<Client['technicalRecord']>,
  ): Promise<Client> {
    const client = await this.findOne(clientId);
    client.technicalRecord = { ...client.technicalRecord, ...update };
    return client.save();
  }

  async addTechnicalNote(clientId: string, note: string): Promise<Client> {
    const client = await this.findOne(clientId);
    client.technicalRecord.notes.push(`${new Date().toISOString()}: ${note}`);
    client.technicalRecord.totalVisits += 1;
    client.technicalRecord.lastVisit = new Date();
    return client.save();
  }

  private generateClientId(): string {
    const prefix = 'CLI';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  async getClientHistory(clientId: string): Promise<any> {
    // This would integrate with the case service to get client's case history
    const client = await this.findByClientId(clientId);
    return {
      client,
      technicalRecord: client.technicalRecord,
      equipment: client.equipment,
    };
  }
}
