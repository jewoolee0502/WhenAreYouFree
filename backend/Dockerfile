FROM oven/bun:latest

WORKDIR /app

# Copy backend files
COPY backend/package.json backend/bun.lock ./backend/
WORKDIR /app/backend
RUN bun install

# Copy all backend and database files
WORKDIR /app
COPY backend ./backend/
COPY database ./database/

WORKDIR /app/backend

EXPOSE 8000
CMD ["bun", "run", "index.ts"]
