FROM node:lts-alpine

RUN apk add --no-cache git tzdata

ENV TZ="America/Sao_Paulo"

RUN date

WORKDIR /home/node/app

COPY . .

RUN chown -R node:node /home/node

RUN ls

USER node

EXPOSE 3333

ENTRYPOINT yarn && yarn dev
