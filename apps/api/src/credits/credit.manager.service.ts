import { Injectable, BadRequestException } from '@nestjs/common';
// import { InjectRedis } from '@liaoliaots/nestjs-redis';
// import Redis from 'ioredis';

@Injectable()
export class CreditManagerService {
  
  constructor(
    // @InjectRedis() private readonly redis: Redis
  ) {}

  /**
   * Checks if the user has enough credits before an AI request.
   */
  async hasSufficientCredits(userId: string, estimatedCost: number): Promise<boolean> {
    // 1. Check Redis cache first for ultra-fast response
    // const cachedCredits = await this.redis.get(`credits:${userId}`);
    
    // 2. Fallback to DB if not in Redis
    const currentCredits = 1000; // Mocked fallback
    
    return currentCredits >= estimatedCost;
  }

  /**
   * Deducts credits immediately from Redis after generation.
   * A separate cron job (BullMQ) will sync this to PostgreSQL periodically.
   */
  async deductCredits(userId: string, inputTokens: number, outputTokens: number, modelMultiplier: number = 1) {
    const cost = Math.ceil((inputTokens + outputTokens) * modelMultiplier);
    
    // Atomically decrement credits in Redis
    // await this.redis.decrby(`credits:${userId}`, cost);
    // await this.redis.sadd(`credits_to_sync`, userId); // Mark user for async DB sync
    
    console.log(`Deducted ${cost} credits from User ${userId}`);
    return cost;
  }
}
