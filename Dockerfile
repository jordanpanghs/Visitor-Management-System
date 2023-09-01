# base image
FROM node:19.1.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

RUN npm ci build

CMD ["npm", "start"]