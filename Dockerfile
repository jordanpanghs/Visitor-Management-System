# base image
FROM node:19.1.0-alpine

COPY . .

RUN npm ci --only=production

RUN npm ci build

CMD ["npm", "start"]