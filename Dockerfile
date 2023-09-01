# base image
FROM node:19.1.0-alpine

WORKDIR /app/

COPY . .

RUN npm ci --only=production

RUN npm ci build

RUN npm run build

CMD ["npm", "start"]