# --- Builder ---
    FROM node:22-bullseye AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci --legacy-peer-deps
    
    COPY . .
    RUN npm run build
    
    # --- Runner ---
    FROM node:22-bullseye AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    ENV PORT=3000
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY package*.json ./
    RUN npm ci --omit=dev --legacy-peer-deps
    
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    # Copy next config if present
    # COPY --from=builder /app/next.config.* ./ || true
    
    EXPOSE 3000
    CMD ["npm", "start"]
    