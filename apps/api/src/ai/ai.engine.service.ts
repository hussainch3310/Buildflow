import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IAIProvider } from './ai.interface';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';

@Injectable()
export class AIEngineService {
  private providers: Map<string, IAIProvider>;

  constructor(
    private openAIProvider: OpenAIProvider,
    private geminiProvider: GeminiProvider,
  ) {
    this.providers = new Map();
    this.providers.set('openai', openAIProvider);
    this.providers.set('gemini', geminiProvider);
  }

  async processRequest(providerName: string, prompt: string, context?: any[]) {
    // Force Gemini for now since OpenAI key is out of credits
    providerName = 'gemini'; 
    
    const provider = this.providers.get(providerName.toLowerCase());
    
    if (!provider) {
      throw new InternalServerErrorException(`AI Provider ${providerName} is not supported.`);
    }

    // Call the unified abstraction method
    const response = await provider.generateResponse(prompt, context);
    
    // Future logic: Push token usage to Redis Credit Manager here
    
    return response;
  }
}
