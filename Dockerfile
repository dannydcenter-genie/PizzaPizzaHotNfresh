# Multi-stage build for Google Cloud Run
# Stage 1: Build the Vite production bundle
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve using high-performance Nginx Alpine
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from builder
COPY --from=builder /app/dist .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run defaults to PORT 8080
ENV PORT=8080
EXPOSE 8080

# Substitute environment PORT in nginx configuration and start
CMD ["sh", "-c", "sed -i \"s/8080/$PORT/g\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
