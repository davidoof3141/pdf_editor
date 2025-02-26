FROM node:20.18.3-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev", "--", "--host"]