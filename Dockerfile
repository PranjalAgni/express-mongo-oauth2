FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3030

CMD npm run dev