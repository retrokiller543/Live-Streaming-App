FROM node
WORKDIR /app
COPY ./package*.json .
RUN npm install
COPY ./app.js .
EXPOSE 1935 8000 8443
CMD ["node", "app.js"]