#Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /myreads-client-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

RUN npm run build

#Step 2: Serve the React app using Nginx FROM nginx:alpine
FROM nginx:alpine

#Copy the built React app to Nginx's default public directory
COPY --from=build /myreads-client-app/build /usr/share/nginx/html

#Expose port 80
EXPOSE 80

#Run Nginx in the foreground 
CMD ["nginx", "-g", "daemon off;"]