FROM node:9.6.1
WORKDIR /var/lib/lxdhub

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .
RUN yarn run build

ENTRYPOINT [ "yarn", "run" ]
CMD [ "start" ]
