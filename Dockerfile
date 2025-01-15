# Step 1: Specify the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application files
COPY . .

# Step 6: Build the application (if required for production)
RUN npm run build

# Step 7: Expose the application's port
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]