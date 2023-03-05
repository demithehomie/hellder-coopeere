# Escolha uma imagem base apropriada para a sua aplicação
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @ionic/cli

COPY . .

RUN ionic build --prod

EXPOSE 8080

CMD ["node", "--max-old-space-size=4096", "app.js", "npm", "run", "start"]

