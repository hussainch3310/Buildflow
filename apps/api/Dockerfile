FROM node:18-alpine AS base

# 1. Dependencies Stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=apps/api

# 3. Runner Stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Only copy production dependencies and compiled code
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
