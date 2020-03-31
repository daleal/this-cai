FROM node:12.16-alpine

# Set up base directory
WORKDIR /usr/src/app

# Cache node_modules as a separate layer
COPY package*.json yarn.lock ./
RUN yarn install

# Add node_modules binaries to the PATH
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Copy app contents
COPY . .

# Build assets
RUN yarn build-assets

# Default run command
CMD ["yarn", "start"]
