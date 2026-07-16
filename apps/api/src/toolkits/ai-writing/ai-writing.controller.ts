import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AIEngineService } from '../../ai/ai.engine.service';

@Controller('ai-writing')
export class AiWritingController {
  constructor(private readonly aiEngine: AIEngineService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateCopy(
    @Req() req: Request, 
    @Body() body: { topic: string; framework: string; tone: string }
  ) {
    const prompt = `Write high-converting marketing copy for the following topic/product: "${body.topic}".
    Use the ${body.framework} copywriting framework.
    The tone should be ${body.tone}.
    Ensure the formatting is clean, using markdown for headings and bold text where appropriate.`;

    const response = await this.aiEngine.processRequest('openai', prompt);
    
    return {
      output: response.content,
      usage: {
        inputTokens: response.inputTokens,
        outputTokens: response.outputTokens,
      }
    };
  }
}
