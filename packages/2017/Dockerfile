FROM node:10.15.3-stretch

# Create app directory
WORKDIR /usr/src/app

# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

# Install app dependencies
COPY package*.json ./
RUN yarn install --production=true

# Bundle app source
COPY server server
COPY dist dist

# Expose the express server port
EXPOSE 3000

# Always use production env
ENV NODE_ENV production
CMD [ "node", "server" ]
