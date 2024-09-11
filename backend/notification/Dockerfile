FROM node:20

WORKDIR /app/notification

COPY package.json .

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8004

CMD ["npm", "start"]