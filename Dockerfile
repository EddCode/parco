FROM node:18-alpine

RUN apk update && apk add yarn

WORKDIR /src/api

COPY ["package.json", "yarn.lock", "."]

RUN yarn

COPY [".", "."]

EXPOSE 3000

CMD ["yarn", "dev"]
