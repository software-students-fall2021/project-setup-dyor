# Base image
FROM node:16

# Set working directory so that all subsequent command runs in this folder
WORKDIR /front-end

# Copy package json and install dependencies
COPY package*.json ./
COPY package-lock.json ./

RUN npm install

# Copy our app
COPY . /front-end

# Expose port to access server
EXPOSE 3000

# Command to run our app
CMD [ "npm", "start" ]