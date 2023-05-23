# Use the official Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY functions/package*.json ./

# Install the dependencies
#RUN npm ci --only=production
#RUN yarn build
RUN npm install

# Copy the rest of the project files to the container
COPY . .

ENV NODE_ENV production

# Build the code
RUN npm run build

# Set the command to run the microservice
CMD [ "npm", "start" ]