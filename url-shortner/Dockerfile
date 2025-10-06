FROM node:18

# Set a generic working directory
WORKDIR /app

# Copy package.json files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the working directory to the backend folder
WORKDIR /app/backend

# Command to run the application
CMD ["node", "index.js"]