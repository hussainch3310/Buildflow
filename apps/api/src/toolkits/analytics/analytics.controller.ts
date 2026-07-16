import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
  
  @UseGuards(JwtAuthGuard)
  @Get('usage')
  async getUsageMetrics(@Req() req: Request) {
    // 1. Fetch token consumption grouped by day/model from PostgreSQL/Redis
    // 2. Return payload formatted for Chart.js
    
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'GPT-4 Usage',
          data: [120, 190, 300, 500, 200, 300, 450],
        }
      ]
    };
  }
}
