FROM node:22-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat
RUN corepack enable


# Install all dependencies needed for build
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# If you really have an .npmrc file, uncomment this line:
# COPY .npmrc ./

RUN pnpm install --frozen-lockfile --prod=false


# Build the Next.js app
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm lint
RUN pnpm build


# Production runtime image
FROM base AS runner

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files and install only production dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# If you really have an .npmrc file, uncomment this line:
# COPY .npmrc ./

RUN pnpm install --frozen-lockfile --prod

# Copy production build output
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy Next config in case next start needs it
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts

USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]
