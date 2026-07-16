import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    // Generate a valid mock JWT for development testing
    const payload = { email: body.email, sub: 1, roles: ['USER'] };
    const accessToken = this.jwtService.sign(payload);
    
    return {
      message: 'Login successful (Dev Mode)',
      accessToken,
      email: body.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: unknown }) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('admin-stats')
  getAdminStats() {
    return { stats: 'Sensitive admin data – RBAC protected.' };
  }
}
