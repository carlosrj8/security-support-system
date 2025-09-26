import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case, CaseDocument, CaseStatus, CaseType, CasePriority } from './schemas/case.schema';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { AgentService } from '../agent/agent.service';
import { AgentType } from '../agent/schemas/agent.schema';

@Injectable()
export class CaseService {
  private readonly logger = new Logger(CaseService.name);

  constructor(
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    private readonly agentService: AgentService,
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    const createdCase = new this.caseModel({
      ...createCaseDto,
      status: CaseStatus.CREATED,
      history: [{
        message: 'Case created',
        from: createCaseDto.createdByType,
        metadata: { ...createCaseDto.details },
      }],
    });
    
    return createdCase.save();
  }

  async findAll(filter: Partial<Case> = {}): Promise<Case[]> {
    return this.caseModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Case> {
    const foundCase = await this.caseModel.findById(id).exec();
    if (!foundCase) {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
    return foundCase;
  }

  async update(id: string, updateCaseDto: UpdateCaseDto): Promise<Case> {
    const existingCase = await this.findOne(id);
    const updatedCase = await this.caseModel
      .findByIdAndUpdate(id, updateCaseDto, { new: true })
      .exec();
    
    // Log the update in history
    if (updateCaseDto.status) {
      await this.addHistory(
        id,
        `Case status changed to ${updateCaseDto.status}`,
        updateCaseDto.updatedByType,
        { status: updateCaseDto.status }
      );
    }
    
    return updatedCase;
  }

  async assignCase(caseId: string, agentId: string, assignerType: AgentType): Promise<Case> {
    const agent = await this.agentService.findOne(agentId);
    const updatedCase = await this.caseModel
      .findByIdAndUpdate(
        caseId,
        { 
          assignedTo: agentId,
          assignedToType: agent.type,
          status: CaseStatus.IN_PROGRESS,
        },
        { new: true },
      )
      .exec();
    
    await this.addHistory(
      caseId,
      `Case assigned to ${agent.name} (${agent.type})`,
      assignerType,
      { assignedTo: agentId, assignedToType: agent.type }
    );
    
    return updatedCase;
  }

  async addHistory(
    caseId: string, 
    message: string, 
    from: AgentType, 
    metadata: Record<string, any> = {},
  ): Promise<Case> {
    return this.caseModel
      .findByIdAndUpdate(
        caseId,
        {
          $push: {
            history: {
              message,
              from,
              metadata,
            },
          },
        },
        { new: true },
      )
      .exec();
  }

  async resolveCase(caseId: string, resolvedBy: string, resolution: string): Promise<Case> {
    const foundCase = await this.findOne(caseId);
    const resolutionTime = Math.floor(
      (new Date().getTime() - foundCase.createdAt.getTime()) / (1000 * 60),
    );

    const updatedCase = await this.caseModel
      .findByIdAndUpdate(
        caseId,
        {
          status: CaseStatus.RESOLVED,
          resolvedAt: new Date(),
          resolutionTime,
        },
        { new: true },
      )
      .exec();

    await this.addHistory(
      caseId,
      `Case resolved: ${resolution}`,
      AgentType.SYSTEM,
      { resolvedBy, resolutionTime },
    );

    return updatedCase;
  }

  async generateCaseFromTemplate(templateType: CaseType, clientId: string): Promise<CreateCaseDto> {
    // This would be expanded with more sophisticated case generation logic
    const templates = {
      [CaseType.CAMERA_OFFLINE]: {
        title: 'Camera offline',
        type: CaseType.CAMERA_OFFLINE,
        priority: CasePriority.HIGH,
        details: {
          cameraId: 'CAM-' + Math.floor(1000 + Math.random() * 9000),
          lastSeen: new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)),
          location: 'Entrance',
        },
      },
      [CaseType.ALARM_ISSUE]: {
        title: 'Alarm system issue',
        type: CaseType.ALARM_ISSUE,
        priority: CasePriority.CRITICAL,
        details: {
          issueType: 'false_alarm',
          zone: Math.floor(Math.random() * 8) + 1,
        },
      },
      // Add more templates as needed
    };

    return {
      ...templates[templateType] || {
        title: 'General support request',
        type: CaseType.OTHER,
        priority: CasePriority.MEDIUM,
        details: {},
      },
      clientId,
      createdBy: 'system',
      createdByType: AgentType.SYSTEM,
    };
  }
}
