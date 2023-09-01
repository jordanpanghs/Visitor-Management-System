# base image
FROM node:19.1.0-alpine

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
COPY . .

# Install production dependencies.
RUN npm ci --only=production

RUN npm run build

CMD ["npm", "start"]