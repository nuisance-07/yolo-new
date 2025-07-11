# Use a lightweight Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for caching
COPY package*.json ./

# Install only production dependencies to minimize size
RUN npm install --production

# Copy application code
COPY . .

# Build the React app
RUN npm run build

# Serve with a lightweight server
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
