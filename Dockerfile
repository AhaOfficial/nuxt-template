# Dockerfile
FROM node:12.18.1

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0
ENV PORT 3000

CMD [ "npm", "start" ]