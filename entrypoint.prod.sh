#!/bin/bash

yarn install && yarn build && cd build && yarn --production && cp ../.env.prod .env && node ace migration:run --force && node ace db:seed && yarn start
