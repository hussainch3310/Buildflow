import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesGuard } from './common/guards/roles.guard';
import { ChatController } from './toolkits/chat/chat.controller';
import { AnalyticsController } from './toolkits/analytics/analytics.controller';
import { StripeWebhookController } from './billing/stripe.webhook.controller';
import { OpenAIProvider } from './ai/providers/openai.provider';
import { GeminiProvider } from './ai/providers/gemini.provider';
import { AIEngineService } from './ai/ai.engine.service';
import { CreditManagerService } from './credits/credit.manager.service';
import { AiWritingController } from './toolkits/ai-writing/ai-writing.controller';
import { AiCodingController } from './toolkits/ai-coding/ai-coding.controller';
import { SeoController } from './toolkits/seo/seo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('NEXTAUTH_SECRET') ?? 'dev-secret-change-in-production',
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [
    AuthController,
    ChatController,
    AnalyticsController,
    StripeWebhookController,
    AiWritingController,
    AiCodingController,
    SeoController,
  ],
  providers: [
    JwtStrategy,
    RolesGuard,
    OpenAIProvider,
    GeminiProvider,
    AIEngineService,
    CreditManagerService,
  ],
})
export class AppModule {}
