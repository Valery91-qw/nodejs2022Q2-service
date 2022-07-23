FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

COPY prisma prisma

COPY .env ./

RUN npm ci --legacy-peer-deps

RUN npx prisma generate

COPY ../.. .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]