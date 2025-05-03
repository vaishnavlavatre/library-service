FROM node:22-alpine

# Set working directory to match your local structure
WORKDIR /usr/src/app

# Install PostgreSQL client and bash
RUN apk add --no-cache postgresql-client bash

# Copy package files first for better caching
COPY package*.json ./

# Install both production and development dependencies
RUN npm install && npm install --only=dev

# Copy all source files
COPY . .

# Environment variables
ENV PORT=3000
ENV DB_HOST=host.docker.internal
ENV DB_PORT=5432
ENV DB_USER=postgres
ENV DB_PASSWORD=Vaishnav@1995
ENV DB_NAME=postgres
ENV NODE_ENV=development

EXPOSE 3000

# Start command with nodemon for development
CMD ["npm", "run", "dev"]