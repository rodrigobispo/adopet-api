FROM node:18
WORKDIR /app-adopet
COPY package*.json ./
EXPOSE 3000
COPY . .
RUN npm install
ENTRYPOINT npm run start
