
FROM node:16.14.0-alpine

EXPOSE 8000
RUN mkdir /app
WORKDIR /app

ENV VITE_API_URL=''

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "preview" ]

