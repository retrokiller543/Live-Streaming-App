FROM node
WORKDIR /app
COPY package*.json .
RUN npm intall
COPY . .
CMD [ "npm", "start" ]