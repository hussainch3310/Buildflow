FROM node:18-alpine AS base

# 1. Dependencies Stage
FROM base AS deps
WORKDIR /app
# Copy package files (requires turbo pruned output in reality, simplified here)
COPY package.json package-lock.json ./
RUN npm ci

# 2. Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Set standalone output for Next.js in next.config.js before building
RUN npm run build --workspace=apps/web

# 3. Runner Stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/web/server.js"]
