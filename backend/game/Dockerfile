FROM node:20

WORKDIR /app/game

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8082

CMD ["npm", "start"]