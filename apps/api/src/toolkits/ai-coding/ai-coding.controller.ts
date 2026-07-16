import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AIEngineService } from '../../ai/ai.engine.service';

@Controller('ai-coding')
export class AiCodingController {
  constructor(private readonly aiEngine: AIEngineService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generateCode(
    @Req() req: Request, 
    @Body() body: { prompt: string; language: string; task: string }
  ) {
    const aiPrompt = `You are an expert developer.
    Language: ${body.language}
    Task: ${body.task}
    
    User Request: ${body.prompt}
    
    Please provide only the requested code block. If explanation is necessary, include it as code comments. Do not wrap the code in markdown code blocks (\`\`\`) unless it's a markdown file.`;

    const response = await this.aiEngine.processRequest('openai', aiPrompt);
    
    // strip markdown code block wrapping if the AI included it anyway
    let output = response.content.trim();
    if (output.startsWith('```')) {
      const firstNewlineIndex = output.indexOf('\n');
      const lastBackticksIndex = output.lastIndexOf('```');
      if (firstNewlineIndex !== -1 && lastBackticksIndex !== -1 && firstNewlineIndex < lastBackticksIndex) {
        output = output.substring(firstNewlineIndex + 1, lastBackticksIndex).trim();
      }
    }
    
    return {
      output: output,
      usage: {
        inputTokens: response.inputTokens,
        outputTokens: response.outputTokens,
      }
    };
  }
}
