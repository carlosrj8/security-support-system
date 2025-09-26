import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HitlRequest, HitlRequestDocument, HitlRequestStatus, HitlRequestType } from './schemas/hitl-request.schema';
import { CreateHitlRequestDto } from './dto/create-hitl-request.dto';
import { AgentType } from '../agent/schemas/agent.schema';

@Injectable()
export class HitlService {
  private readonly logger = new Logger(HitlService.name);

  constructor(
    @InjectModel(HitlRequest.name) private hitlRequestModel: Model<HitlRequestDocument>,
  ) {}

  async createRequest(createHitlRequestDto: CreateHitlRequestDto): Promise<HitlRequest> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours to respond

    const createdRequest = new this.hitlRequestModel({
      ...createHitlRequestDto,
      expiresAt,
      conversation: [{
        message: `HITL request created: ${createHitlRequestDto.description}`,
        from: createHitlRequestDto.requestingAgent,
        metadata: { context: createHitlRequestDto.context },
      }],
    });

    const savedRequest = await createdRequest.save();
    
    // TODO: Send notification to human operators (WhatsApp, Telegram, etc.)
    await this.notifyHumanOperators(savedRequest);
    
    return savedRequest;
  }

  async findAll(filter: Partial<HitlRequest> = {}): Promise<HitlRequest[]> {
    return this.hitlRequestModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findPending(): Promise<HitlRequest[]> {
    return this.hitlRequestModel
      .find({ 
        status: HitlRequestStatus.PENDING,
        expiresAt: { $gt: new Date() },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<HitlRequest> {
    const request = await this.hitlRequestModel.findById(id).exec();
    if (!request) {
      throw new NotFoundException(`HITL request with ID ${id} not found`);
    }
    return request;
  }

  async respondToRequest(
    requestId: string,
    approved: boolean,
    feedback: string,
    decidedBy: string,
    modifications?: Record<string, any>,
  ): Promise<HitlRequest> {
    const request = await this.findOne(requestId);
    
    if (request.status !== HitlRequestStatus.PENDING) {
      throw new Error('Request is no longer pending');
    }

    const updatedRequest = await this.hitlRequestModel
      .findByIdAndUpdate(
        requestId,
        {
          status: approved ? HitlRequestStatus.APPROVED : HitlRequestStatus.REJECTED,
          humanDecision: {
            approved,
            modifications,
            feedback,
            decidedBy,
            decidedAt: new Date(),
          },
          $push: {
            conversation: {
              message: `Human decision: ${approved ? 'APPROVED' : 'REJECTED'} - ${feedback}`,
              from: decidedBy,
              metadata: { approved, modifications },
            },
          },
        },
        { new: true },
      )
      .exec();

    // Notify the requesting agent about the decision
    await this.notifyRequestingAgent(updatedRequest);
    
    return updatedRequest;
  }

  async addConversationMessage(
    requestId: string,
    message: string,
    from: string,
    metadata?: Record<string, any>,
  ): Promise<HitlRequest> {
    return this.hitlRequestModel
      .findByIdAndUpdate(
        requestId,
        {
          $push: {
            conversation: {
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

  async expireOldRequests(): Promise<void> {
    const expiredRequests = await this.hitlRequestModel
      .updateMany(
        {
          status: HitlRequestStatus.PENDING,
          expiresAt: { $lt: new Date() },
        },
        { status: HitlRequestStatus.EXPIRED },
      )
      .exec();

    this.logger.log(`Expired ${expiredRequests.modifiedCount} old HITL requests`);
  }

  private async notifyHumanOperators(request: HitlRequest): Promise<void> {
    // TODO: Implement WhatsApp/Telegram notifications
    this.logger.log(`Notifying human operators about HITL request: ${request._id}`);
    
    // This would integrate with WhatsApp Business API or Telegram Bot API
    // For now, we'll just log the notification
    const message = `
🚨 HITL Request Required
Title: ${request.title}
Type: ${request.type}
From: ${request.requestingAgent}
Description: ${request.description}
Expires: ${request.expiresAt.toLocaleString()}
    `;
    
    this.logger.log(message);
  }

  private async notifyRequestingAgent(request: HitlRequest): Promise<void> {
    // TODO: Implement agent notification system
    this.logger.log(`Notifying agent ${request.requestingAgentId} about HITL decision: ${request.humanDecision?.approved ? 'APPROVED' : 'REJECTED'}`);
  }

  async getStatistics(): Promise<any> {
    const stats = await this.hitlRequestModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const avgResponseTime = await this.hitlRequestModel.aggregate([
      {
        $match: {
          status: { $in: [HitlRequestStatus.APPROVED, HitlRequestStatus.REJECTED] },
          'humanDecision.decidedAt': { $exists: true },
        },
      },
      {
        $project: {
          responseTime: {
            $subtract: ['$humanDecision.decidedAt', '$createdAt'],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTime' },
        },
      },
    ]);

    return {
      statusCounts: stats,
      averageResponseTimeMs: avgResponseTime[0]?.avgResponseTime || 0,
    };
  }
}
