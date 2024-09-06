FROM node:20

WORKDIR /app/game

COPY package.json .

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8002

CMD ["npm", "start"]