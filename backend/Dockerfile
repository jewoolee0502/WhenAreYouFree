FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock /app/
RUN bun install

COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]
