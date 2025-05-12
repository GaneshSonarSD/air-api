# Use Node.js official LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the port your app listens on (adjust if needed)
EXPOSE 3030

# Start the app
CMD ["npm", "start"]
