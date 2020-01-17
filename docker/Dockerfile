FROM node:13.6.0

WORKDIR /var/www/burger-builder

COPY package-lock.json /var/www/burger-builder/package-lock.json
COPY package.json /var/www/burger-builder/package.json

RUN npm install

EXPOSE 3000

CMD npm start