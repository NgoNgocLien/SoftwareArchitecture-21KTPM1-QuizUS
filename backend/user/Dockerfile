FROM node:20

WORKDIR /app/user

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]