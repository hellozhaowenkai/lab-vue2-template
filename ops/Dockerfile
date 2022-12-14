# syntax=docker/dockerfile:1

# build stage
FROM node:lts-alpine AS build-stage

# make the `app` folder the current working directory
WORKDIR /app/

# copy both `package.json` and `package-lock.json` (if available)
COPY package*.json ./

# install project dependencies
RUN echo "START." \
  && npm install \
    --userconfig  $HOME/.cnpmrc \
    --registry    https://registry.npmmirror.com \
    --cache       $HOME/.npm/.cache/cnpm/ \
    --disturl=https://npmmirror.com/dist/ \
  && echo "END."

# copy project files and folders to the current working directory (i.e. `app` folder)
COPY . .

# build app for production with minification
RUN echo "START." \
  && npm run build \
  && echo "END."

# production stage
FROM nginx:stable-alpine AS production-stage

# set timezone
ENV TZ=Asia/Shanghai

# make the `app` folder the current working directory
WORKDIR /app/

# copy all files
COPY --from=build-stage /app/ /app/
# copy static files to NGINX html directory
# COPY --from=build-stage /app/dist/ /app/dist/
# copy operations scripts to NGINX conf directory
# COPY --from=build-stage /app/ops/ /app/ops/

# the container listens on the specified network ports at runtime
EXPOSE 8888

# run NGINX server in foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# run NGINX server in `/app` prefix path
CMD ["-p", "/app/", "-c", "/app/ops/nginx.conf"]
