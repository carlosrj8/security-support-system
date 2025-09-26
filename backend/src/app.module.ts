import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './modules/agent/agent.module';
import { CaseModule } from './modules/case/case.module';
import { ClientModule } from './modules/client/client.module';
import { HitlModule } from './modules/hitl/hitl.module';
import { Agent } from './modules/agent/entities/agent.entity';
import { Case } from './modules/case/entities/case.entity';
import { Client } from './modules/client/entities/client.entity';
import { HitlRequest } from './modules/hitl/entities/hitl-request.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Agent, Case, Client, HitlRequest],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        ssl: configService.get<string>('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),
    AgentModule,
    CaseModule,
    ClientModule,
    HitlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
