FROM node:20

WORKDIR /app/campaign

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8083

CMD ["npm", "start"]