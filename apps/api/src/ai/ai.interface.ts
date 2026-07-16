export type AIResponse = {
  content: string;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
};

export interface IAIProvider {
  /**
   * Generates a text response based on the input prompt.
   * Context can be injected for chat history or RAG (Retrieval-Augmented Generation).
   */
  generateResponse(prompt: string, context?: any[]): Promise<AIResponse>;
  
  /**
   * Calculates the exact token cost for the generation.
   * Useful for pre-flight estimations or strict provider tracking.
   */
  calculateTokens(input: string, output?: string): number;
}
