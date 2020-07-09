FROM node:12.16.1-stretch

# Create app directory
WORKDIR /usr/src/app

# Install yarn
RUN apt-get update && apt-get install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Copy and clean the package.json file to remove invalid
# packages since this won't be associated to the workspace
COPY package*.json ./
COPY clean-packages.js clean-packages.js
RUN node clean-packages.js

# Instal dependencies
RUN yarn install --production=true

# Bundle app source
COPY server server
COPY dist dist

# Expose the express server port
EXPOSE 3000

# Always use production env
ENV NODE_ENV production
CMD [ "node", "server" ]