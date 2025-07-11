# Use a lightweight Node.js base image
FROM node:13-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install only production dependencies to minimize size
RUN npm install --production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
