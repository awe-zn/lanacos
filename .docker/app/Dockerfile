FROM node:lts-alpine

RUN apk add --no-cache git tzdata

ENV TZ="America/Sao_Paulo"

WORKDIR /home/node/app

COPY . .

RUN chown -R node:node /home/node

USER node

EXPOSE 3333

ENTRYPOINT yarn && yarn dev
