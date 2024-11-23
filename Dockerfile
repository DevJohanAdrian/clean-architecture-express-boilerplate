FROM node:22.11.0-alpine3.20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci 

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Install prisma client 
RUN npm run prisma-postinstall

# Expose port 3000
EXPOSE 3000

# Start the app
CMD npm run dev