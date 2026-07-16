import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAIProvider, AIResponse } from '../ai.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiProvider implements IAIProvider {
  private genAI: GoogleGenerativeAI;
  private modelName = 'gemini-flash-latest'; // using gemini-flash-latest

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is missing');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async generateResponse(prompt: string, context?: any[]): Promise<AIResponse> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const messageContent = response.text();

      return {
        content: messageContent,
        modelUsed: this.modelName,
        inputTokens: this.calculateTokens(prompt), // In a real app we'd use model.countTokens()
        outputTokens: this.calculateTokens(messageContent),
      };
    } catch (error: any) {
      console.error('Gemini generation error:', error);
      throw new InternalServerErrorException('Failed to generate AI response');
    }
  }

  calculateTokens(input: string, output: string = ''): number {
    return Math.ceil((input.length + output.length) / 4);
  }
}
