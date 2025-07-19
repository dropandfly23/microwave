# Stage 1: Build the LunchLine React app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# App name
LABEL name="LunchLine" version="1.0" maintainer="kadmiri.nidal@gmail.com"

# Copy build artifacts from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Replace default Nginx config for SPA support
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
