# build stage
FROM node:lts-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm \
  --registry https://registry.npm.taobao.org/ \
  --cache $HOME/.npm/.cache/cnpm/ \
  --disturl https://npm.taobao.org/dist/ \
  --userconfig $HOME/.cnpmrc \
  install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

# copy static files to nginx html directory
COPY --from build-stage /app/dist/* /usr/share/nginx/html/

# the container listens on the specified network ports at runtime
EXPOSE 80

# run Nginx server in foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
