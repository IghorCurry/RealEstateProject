# Use Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code (excluding node_modules via .dockerignore)
COPY . .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the app with serve and proper SPA configuration
CMD ["serve", "-s", "dist", "-l", "3000", "--single", "--no-clipboard"] 