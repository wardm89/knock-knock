# Use an official Node.js 18 runtime as the base image
FROM node:18-alpine

# Set the build argument for the version (default to "1.0.0" if not provided)
ARG APP_VERSION=1.0.0

# Set the environment variable from the build argument
ENV DATABASE_URL=$DATABASE_URL
ENV MYSQL_DB_USERNAME=$MYSQL_DB_USERNAME
ENV MYSQL_DB_PASSWORD=$MYSQL_DB_PASSWORD
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_SECRET=$DISCORD_CLIENT_SECRET
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Set the working directory inside the container
WORKDIR /app

EXPOSE 3000

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript application
RUN yarn build --version $APP_VERSION


# Specify the command to run the compiled application
CMD [ "yarn", "start" ]