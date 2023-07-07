FROM node:latest

WORKDIR /home/node/project

COPY package*.json /home/node/project/

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]