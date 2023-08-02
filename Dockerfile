FROM node:20.5.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate dev

EXPOSE 8000

CMD ["npm", "run","start:dev"]