import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAIProvider, AIResponse } from '../ai.interface';
import OpenAI from 'openai';

@Injectable()
export class OpenAIProvider implements IAIProvider {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      console.warn('OPENAI_API_KEY is missing');
    }
    this.openai = new OpenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });
  }

  async generateResponse(prompt: string, context?: any[]): Promise<AIResponse> {
    try {
      const messages: any[] = context && context.length > 0 ? [...context] : [];
      messages.push({ role: 'user', content: prompt });

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // using mini for speed/cost efficiency in dev
        messages: messages,
      });

      const messageContent = response.choices[0]?.message?.content || '';
      const usage = response.usage;

      return {
        content: messageContent,
        modelUsed: response.model,
        inputTokens: usage?.prompt_tokens || this.calculateTokens(prompt),
        outputTokens: usage?.completion_tokens || this.calculateTokens(messageContent),
      };
    } catch (error: any) {
      console.error('OpenAI generation error:', error);
      throw new InternalServerErrorException('Failed to generate AI response');
    }
  }

  calculateTokens(input: string, output: string = ''): number {
    return Math.ceil((input.length + output.length) / 4);
  }
}

