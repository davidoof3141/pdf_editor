# Use an official Node.js runtime as a parent image
FROM node:20.18.3-slim

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

RUN npm install
RUN npm install -D tailwindcss postcss autoprefixer
#RUN npx shadcn@latest init


# Copy the rest of the frontend code
COPY . .

# Expose the port that Vite runs on (default is 5173)
EXPOSE 5173

# Start the Vite development server (for dev); 
# for production you could build and serve via Nginx or another approach
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
