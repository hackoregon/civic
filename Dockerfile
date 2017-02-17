FROM node:boron

RUN mkdir -p /usr/src/civic
WORKDIR /usr/src/civic

COPY package.json /usr/src/civic/
RUN npm install

COPY . /usr/src/civic

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start:server" ]
