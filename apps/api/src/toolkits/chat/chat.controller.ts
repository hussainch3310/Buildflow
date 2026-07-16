import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AIEngineService } from '../../ai/ai.engine.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly aiEngine: AIEngineService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('message')
  async sendMessage(@Req() req: Request, @Body() body: { threadId?: string; prompt: string }) {
    // 1. Verify user credits via CreditManagerService (placeholder)
    // 2. Pass prompt to AIEngineService
    const response = await this.aiEngine.processRequest('openai', body.prompt);
    
    // 3. Save message and response to PostgreSQL (Thread History) (placeholder)
    
    return {
      message: response.content,
      threadId: body.threadId || 'new-thread-123',
      usage: {
        inputTokens: response.inputTokens,
        outputTokens: response.outputTokens,
      }
    };
  }
}
