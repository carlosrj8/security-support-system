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
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent, AgentStatus, AgentType } from './schemas/agent.schema';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  async findAll(@Query('type') type?: AgentType): Promise<Agent[]> {
    if (type) {
      return this.agentService.findByType(type);
    }
    return this.agentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Agent> {
    return this.agentService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
  ): Promise<Agent> {
    return this.agentService.update(id, updateAgentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.agentService.remove(id);
    return { success: result };
  }

  @Put(':id/status/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: AgentStatus,
  ): Promise<Agent> {
    return this.agentService.updateStatus(id, status);
  }
}
