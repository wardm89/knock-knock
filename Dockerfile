# Use an official Node.js 18 runtime as the base image
FROM node:18-alpine

# Set the build argument for the version (default to "1.0.0" if not provided)
ARG APP_VERSION=1.0.0

# Set the working directory inside the container
WORKDIR /app

EXPOSE 3000

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript application
RUN yarn build --version $APP_VERSION


# Specify the command to run the compiled application
CMD [ "yarn", "start" ]