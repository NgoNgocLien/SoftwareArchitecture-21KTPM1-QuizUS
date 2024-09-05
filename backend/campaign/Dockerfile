FROM node:20

WORKDIR /app/campaign

COPY package.json .

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8083

CMD ["npm", "start"]