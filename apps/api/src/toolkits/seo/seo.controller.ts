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
      const https = require('https');
      const startTime = Date.now();
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        timeout: 15000,
      });
      const loadTimeMs = Date.now() - startTime;

      const html = response.data;
      const $ = cheerio.load(html);

      const issues = [];
      
      // Load Time Issue
      if (loadTimeMs > 3000) {
        issues.push({ type: 'error', msg: `Page load time is very slow (${loadTimeMs}ms)` });
      } else if (loadTimeMs > 1500) {
        issues.push({ type: 'warning', msg: `Page load time could be improved (${loadTimeMs}ms)` });
      } else {
        issues.push({ type: 'info', msg: `Fast page load time (${loadTimeMs}ms)` });
      }
      
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
          if (missingAltCount <= 20) {
            const src = $(img).attr('src') || 'unknown';
            issues.push({ type: 'warning', msg: `Image missing alt attribute: src="${src}"` });
          }
        }
      });
      if (missingAltCount > 20) {
        issues.push({ type: 'warning', msg: `...and ${missingAltCount - 20} more images missing alt attributes` });
      } else if (missingAltCount === 0 && images.length > 0) {
        issues.push({ type: 'info', msg: 'All images have alt attributes' });
      }

      // Canonical
      const canonical = $('link[rel="canonical"]').attr('href');
      if (!canonical) {
        issues.push({ type: 'warning', msg: 'Missing canonical URL link' });
      }

      // Advanced Accessibility Checks
      // 1. Check HTML Lang
      let a11yErrors = 0;
      if (!$('html').attr('lang')) {
        issues.push({ type: 'warning', msg: 'Missing lang attribute on <html> tag' });
        a11yErrors += 5;
      }
      
      // 2. Empty Links
      let emptyLinks = 0;
      $('a').each((i, link) => {
        const text = $(link).text().trim();
        const ariaLabel = $(link).attr('aria-label');
        if (!text && !ariaLabel) {
          emptyLinks++;
          if (emptyLinks <= 20) {
            const href = $(link).attr('href') || 'unknown';
            issues.push({ type: 'warning', msg: `Empty link found (missing text or aria-label): href="${href}"` });
          }
        }
      });
      if (emptyLinks > 20) {
        issues.push({ type: 'warning', msg: `...and ${emptyLinks - 20} more empty links` });
      }
      if (emptyLinks > 0) {
        a11yErrors += Math.min(emptyLinks * 2, 10);
      }

      // 3. Form inputs missing labels/aria
      let missingInputLabels = 0;
      $('input:not([type="hidden"]):not([type="submit"]):not([type="button"])').each((i, input) => {
        const id = $(input).attr('id');
        const ariaLabel = $(input).attr('aria-label');
        if (!ariaLabel) {
          if (!id || $(`label[for="${id}"]`).length === 0) {
            missingInputLabels++;
            if (missingInputLabels <= 20) {
              const name = $(input).attr('name') || $(input).attr('type') || 'unknown';
              issues.push({ type: 'warning', msg: `Form input missing label or aria-label: name/type="${name}"` });
            }
          }
        }
      });
      if (missingInputLabels > 20) {
        issues.push({ type: 'warning', msg: `...and ${missingInputLabels - 20} more form inputs missing labels` });
      }
      if (missingInputLabels > 0) {
        a11yErrors += Math.min(missingInputLabels * 3, 15);
      }

      // Basic Heuristic Scoring (Out of 100)
      const errorCount = issues.filter(i => i.type === 'error').length;
      const warningCount = issues.filter(i => i.type === 'warning').length;
      
      // Cap the warning penalty so that detailed element listings don't tank the SEO score to 0
      const seoPenalty = (errorCount * 15) + Math.min(warningCount * 2, 40);
      const seoScore = Math.max(0, 100 - seoPenalty);
      
      // Cap the missing alt attribute penalty at 30 points
      const accessibilityScore = Math.max(0, 100 - Math.min(missingAltCount * 2, 30) - a11yErrors);
      const bestPracticesScore = canonical ? 90 : 70;
      
      let performanceScore = 100;
      if (loadTimeMs > 3000) performanceScore -= 40;
      else if (loadTimeMs > 1500) performanceScore -= 20;
      else if (loadTimeMs > 500) performanceScore -= 5;
      if (response.headers['content-encoding'] !== 'gzip' && response.headers['content-encoding'] !== 'br') {
        performanceScore -= 15;
      }
      performanceScore = Math.max(0, performanceScore);

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
