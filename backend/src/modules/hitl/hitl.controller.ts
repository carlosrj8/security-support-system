import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { HitlService } from './hitl.service';
import { CreateHitlRequestDto } from './dto/create-hitl-request.dto';
import { HitlRequest, HitlRequestStatus } from './schemas/hitl-request.schema';

@Controller('hitl')
export class HitlController {
  constructor(private readonly hitlService: HitlService) {}

  @Post('requests')
  async createRequest(@Body() createHitlRequestDto: CreateHitlRequestDto): Promise<HitlRequest> {
    return this.hitlService.createRequest(createHitlRequestDto);
  }

  @Get('requests')
  async findAll(
    @Query('status') status?: HitlRequestStatus,
    @Query('type') type?: string,
  ): Promise<HitlRequest[]> {
    const filter: any = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    
    return this.hitlService.findAll(filter);
  }

  @Get('requests/pending')
  async findPending(): Promise<HitlRequest[]> {
    return this.hitlService.findPending();
  }

  @Get('requests/:id')
  async findOne(@Param('id') id: string): Promise<HitlRequest> {
    return this.hitlService.findOne(id);
  }

  @Put('requests/:id/respond')
  async respondToRequest(
    @Param('id') requestId: string,
    @Body('approved') approved: boolean,
    @Body('feedback') feedback: string,
    @Body('decidedBy') decidedBy: string,
    @Body('modifications') modifications?: Record<string, any>,
  ): Promise<HitlRequest> {
    return this.hitlService.respondToRequest(
      requestId,
      approved,
      feedback,
      decidedBy,
      modifications,
    );
  }

  @Post('requests/:id/message')
  async addMessage(
    @Param('id') requestId: string,
    @Body('message') message: string,
    @Body('from') from: string,
    @Body('metadata') metadata?: Record<string, any>,
  ): Promise<HitlRequest> {
    return this.hitlService.addConversationMessage(requestId, message, from, metadata);
  }

  @Get('statistics')
  async getStatistics(): Promise<any> {
    return this.hitlService.getStatistics();
  }

  @Post('expire-old')
  async expireOldRequests(): Promise<{ message: string }> {
    await this.hitlService.expireOldRequests();
    return { message: 'Old requests expired successfully' };
  }
}
