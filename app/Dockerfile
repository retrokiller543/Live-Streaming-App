FROM node
WORKDIR /app/
COPY package*.json .
RUN npm install
COPY . .

CMD ["next", "dev"]