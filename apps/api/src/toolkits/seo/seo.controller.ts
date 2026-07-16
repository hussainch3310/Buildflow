import { Controller, Post, UseGuards, Body, InternalServerErrorException } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Controller('seo')
export class SeoController {
  
  @UseGuards(JwtAuthGuard)
  @Post('audit')
  async runAudit(@Body() body: { url: string }) {
    let targetUrl = body.url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': 'BuildFlow-SEO-Crawler/1.0',
        },
        timeout: 10000,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      const issues = [];
      
      // Meta Title
      const title = $('title').text().trim();
      if (!title) {
        issues.push({ type: 'error', msg: 'Missing <title> tag' });
      } else if (title.length < 10) {
        issues.push({ type: 'warning', msg: 'Title is too short (< 10 chars)' });
      } else if (title.length > 60) {
        issues.push({ type: 'warning', msg: 'Title might be too long (> 60 chars)' });
      } else {
        issues.push({ type: 'info', msg: 'Title tag length is optimal' });
      }

      // Meta Description
      const description = $('meta[name="description"]').attr('content')?.trim();
      if (!description) {
        issues.push({ type: 'error', msg: 'Missing meta description' });
      } else if (description.length < 50) {
        issues.push({ type: 'warning', msg: 'Meta description is too short' });
      } else if (description.length > 160) {
        issues.push({ type: 'warning', msg: 'Meta description might be too long' });
      } else {
        issues.push({ type: 'info', msg: 'Meta description length is optimal' });
      }

      // H1 Tags
      const h1s = $('h1');
      if (h1s.length === 0) {
        issues.push({ type: 'error', msg: 'No H1 tag found' });
      } else if (h1s.length > 1) {
        issues.push({ type: 'warning', msg: `Multiple H1 tags found (${h1s.length})` });
      } else {
        issues.push({ type: 'info', msg: 'H1 tag structure is correct' });
      }

      // Images without Alt
      const images = $('img');
      let missingAltCount = 0;
      images.each((i, img) => {
        const alt = $(img).attr('alt');
        if (!alt || alt.trim() === '') {
          missingAltCount++;
        }
      });
      if (missingAltCount > 0) {
        issues.push({ type: 'warning', msg: `Images missing alt attributes (${missingAltCount} found)` });
      } else if (images.length > 0) {
        issues.push({ type: 'info', msg: 'All images have alt attributes' });
      }

      // Canonical
      const canonical = $('link[rel="canonical"]').attr('href');
      if (!canonical) {
        issues.push({ type: 'warning', msg: 'Missing canonical URL link' });
      }

      // Basic Heuristic Scoring (Out of 100)
      const errorCount = issues.filter(i => i.type === 'error').length;
      const warningCount = issues.filter(i => i.type === 'warning').length;
      
      const seoScore = Math.max(0, 100 - (errorCount * 15) - (warningCount * 5));
      const accessibilityScore = Math.max(0, 100 - (missingAltCount * 2));
      const bestPracticesScore = canonical ? 90 : 70;
      const performanceScore = response.headers['content-encoding'] === 'gzip' || response.headers['content-encoding'] === 'br' ? 95 : 75;

      const metrics = [
        { 
          label: 'SEO Score', 
          score: seoScore, 
          color: seoScore >= 90 ? 'text-green-500' : seoScore >= 60 ? 'text-yellow-500' : 'text-red-500', 
          bg: seoScore >= 90 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500' 
        },
        { 
          label: 'Accessibility', 
          score: accessibilityScore, 
          color: accessibilityScore >= 90 ? 'text-green-500' : accessibilityScore >= 60 ? 'text-yellow-500' : 'text-red-500', 
          bg: accessibilityScore >= 90 ? 'bg-green-500' : accessibilityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500' 
        },
        { 
          label: 'Performance', 
          score: performanceScore, 
          color: performanceScore >= 90 ? 'text-green-500' : performanceScore >= 60 ? 'text-yellow-500' : 'text-red-500', 
          bg: performanceScore >= 90 ? 'bg-green-500' : performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500' 
        },
        { 
          label: 'Best Practices', 
          score: bestPracticesScore, 
          color: bestPracticesScore >= 90 ? 'text-green-500' : bestPracticesScore >= 60 ? 'text-yellow-500' : 'text-red-500', 
          bg: bestPracticesScore >= 90 ? 'bg-green-500' : bestPracticesScore >= 60 ? 'bg-yellow-500' : 'bg-red-500' 
        },
      ];

      return {
        url: targetUrl,
        metrics,
        issues,
      };

    } catch (error: any) {
      console.error('SEO Crawler Error:', error.message);
      throw new InternalServerErrorException('Failed to crawl the provided URL. Ensure it is accessible.');
    }
  }
}
