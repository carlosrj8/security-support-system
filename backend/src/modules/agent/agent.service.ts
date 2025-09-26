import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent, AgentStatus, AgentType } from './entities/agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentRepository.create(createAgentDto);
    return this.agentRepository.save(agent);
  }

  async findAll(filter: Partial<Agent> = {}): Promise<Agent[]> {
    return this.agentRepository.find({ where: filter });
  }

  async findOne(id: string): Promise<Agent | null> {
    return this.agentRepository.findOne({ where: { id } });
  }

  async findByType(type: AgentType): Promise<Agent[]> {
    return this.agentRepository.find({ where: { type } });
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent | null> {
    await this.agentRepository.update(id, updateAgentDto);
    return this.agentRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.agentRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async updateStatus(id: string, status: AgentStatus): Promise<Agent | null> {
    await this.agentRepository.update(id, { status });
    return this.agentRepository.findOne({ where: { id } });
  }

  async logActivity(agentId: string, activity: string, metadata: any = {}): Promise<void> {
    this.logger.log(`Agent ${agentId} activity: ${activity}`, metadata);
    // TODO: Store activity in database
  }
}
