import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case, CaseStatus, CaseType } from './schemas/case.schema';
import { AgentType } from '../agent/schemas/agent.schema';

@Controller('cases')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  async create(@Body() createCaseDto: CreateCaseDto): Promise<Case> {
    return this.caseService.create(createCaseDto);
  }

  @Get()
  async findAll(
    @Query('status') status?: CaseStatus,
    @Query('type') type?: CaseType,
    @Query('assignedTo') assignedTo?: string,
  ): Promise<Case[]> {
    const filter: any = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (assignedTo) filter.assignedTo = assignedTo;
    
    return this.caseService.findAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Case> {
    const foundCase = await this.caseService.findOne(id);
    if (!foundCase) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return foundCase;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCaseDto: UpdateCaseDto,
  ): Promise<Case> {
    return this.caseService.update(id, updateCaseDto);
  }

  @Post(':id/assign/:agentId')
  async assignCase(
    @Param('id') caseId: string,
    @Param('agentId') agentId: string,
    @Query('assignerType') assignerType: AgentType,
  ): Promise<Case> {
    return this.caseService.assignCase(caseId, agentId, assignerType);
  }

  @Post(':id/resolve')
  async resolveCase(
    @Param('id') caseId: string,
    @Body('resolvedBy') resolvedBy: string,
    @Body('resolution') resolution: string,
  ): Promise<Case> {
    return this.caseService.resolveCase(caseId, resolvedBy, resolution);
  }

  @Post('generate')
  async generateCase(
    @Body('type') type: CaseType,
    @Body('clientId') clientId: string,
  ): Promise<Case> {
    const caseData = await this.caseService.generateCaseFromTemplate(type, clientId);
    return this.caseService.create(caseData);
  }
}
