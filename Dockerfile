# Stage 1: Build Stage
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire application to the working directory
COPY . .

# Environment variables for this build
# ARG _REACT_APP_API_URL
# ARG _REACT_APP_GOOGLE_API_KEY
# ARG _REACT_APP_ROLLBAR_ACCESS_TOKEN
# ARG _REACT_APP_API_HOST_DEV
# ARG _REACT_APP_API_BASE_URL

# ENV REACT_APP_API_URL=$_REACT_APP_API_URL
# ENV REACT_APP_GOOGLE_API_KEY=$_REACT_APP_GOOGLE_API_KEY
# ENV REACT_APP_ROLLBAR_ACCESS_TOKEN=$_REACT_APP_ROLLBAR_ACCESS_TOKEN
# ENV REACT_APP_API_HOST_DEV=$_REACT_APP_API_HOST_DEV
# ENV REACT_APP_API_BASE_URL=$_REACT_APP_API_BASE_URL

# Build the React application
EXPOSE 3000

CMD ["npm", "start"]

# Stage 2: Nginx Stage
# FROM nginx:1-alpine3.18 as nginx

# # Copy built files from the previous stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Command to run the application
# CMD ["nginx", "-g", "daemon off;"]