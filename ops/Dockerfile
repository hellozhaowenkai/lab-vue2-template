# syntax=docker/dockerfile:1

# Build stage.
FROM node:lts-alpine AS build-stage

# Make the `workspace` folder the current working directory.
WORKDIR /workspace/

# Copy both `package.json` and `package-lock.json` (if available).
COPY package*.json ./

# Install project dependencies.
RUN echo 'START.' \
  && npm install \
    --userconfig  "${HOME}/.cnpmrc" \
    --registry    https://registry.npmmirror.com \
    --cache       "${HOME}/.npm/.cache/cnpm/" \
    --disturl=https://npmmirror.com/dist/ \
  && echo 'END.'

# Copy project files and folders to the current working directory (i.e. `workspace` folder).
COPY . .

# Build app for production with minification.
RUN echo 'START.' \
  && npm run build \
  && echo 'END.'

# Production stage.
FROM nginx:stable-alpine AS production-stage

# Set timezone.
ENV TZ=Asia/Shanghai

# Make the `workspace` folder the current working directory.
WORKDIR /workspace/

# Copy static files to NGINX html directory.
COPY --from=build-stage /workspace/dist/ /workspace/dist/
# Copy operations scripts to NGINX config directory.
COPY ops/ ops/

# The container listens on the specified network ports at runtime.
EXPOSE 8888

# Run NGINX server in foreground.
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Run NGINX server in `/workspace/` prefix path.
CMD ["-p", "/workspace/", "-c", "/workspace/ops/nginx.conf"]
