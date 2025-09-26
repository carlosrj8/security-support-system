import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientStatus, ClientType } from './schemas/client.schema';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(
    @Query('type') type?: ClientType,
    @Query('status') status?: ClientStatus,
  ): Promise<Client[]> {
    const filter: any = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    return this.clientService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Get('by-client-id/:clientId')
  async findByClientId(@Param('clientId') clientId: string): Promise<Client> {
    return this.clientService.findByClientId(clientId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.clientService.remove(id);
    return { success: result };
  }

  @Post(':id/equipment')
  async addEquipment(
    @Param('id') id: string,
    @Body() equipment: any,
  ): Promise<Client> {
    return this.clientService.addEquipment(id, equipment);
  }

  @Post(':id/technical-note')
  async addTechnicalNote(
    @Param('id') id: string,
    @Body('note') note: string,
  ): Promise<Client> {
    return this.clientService.addTechnicalNote(id, note);
  }

  @Get(':clientId/history')
  async getClientHistory(@Param('clientId') clientId: string): Promise<any> {
    return this.clientService.getClientHistory(clientId);
  }
}
