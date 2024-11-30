FROM node:20.18-slim

WORKDIR /app

COPY . /app

RUN apt-get update -y && apt-get install -y openssl
RUN apt update -y && apt upgrade -y

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
