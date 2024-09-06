FROM node:20

WORKDIR /app/user

COPY package.json .

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8001

CMD ["npm", "start"]