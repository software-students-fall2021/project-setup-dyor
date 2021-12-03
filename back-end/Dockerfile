# Base image
FROM node:16

# Set working directory so that all subsequent command runs in this folder
WORKDIR /back-end

# Copy package json and install dependencies
COPY package*.json ./
COPY package-lock.json ./

RUN npm install

# Copy our app
COPY . /back-end

# Expose port to access server
EXPOSE 3001
# Command to run our app
CMD [ "npm", "run", "devStart"]