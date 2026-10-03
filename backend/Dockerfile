FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY src ./src

# Run as non-root user
USER node

EXPOSE 5000

CMD ["npm", "start"]