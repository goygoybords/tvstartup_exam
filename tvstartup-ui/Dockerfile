# tvstartup-ui/Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the Angular project files into the container
COPY . /app/

# Install Angular CLI and project dependencies
RUN npm install -g @angular/cli
RUN npm install

# Expose Angular's port
EXPOSE 4200

# Start Angular server
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]

