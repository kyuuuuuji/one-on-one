FROM node:8.15.0-alpine

RUN yarn global add @vue/cli@3.2.2
RUN yarn global add @vue/cli-service-global
RUN yarn install