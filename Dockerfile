# image
FROM node:14.15.4-alpine2.12

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli 

USER node

WORKDIR /home/node/app
