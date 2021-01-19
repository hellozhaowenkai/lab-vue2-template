# lab-vue2-demo

## Description

Opinionated Vue2 Starter Template

## Docker

### Build image

```bash
docker build --tag lab-vue2-demo:latest .
```

### Run container

```bash
docker container run \
  --name lab-vue2-demo \
  --publish 10202:80 \
  --volume $(pwd)/logs:/var/log/nginx \
  --env TZ=Asia/Shanghai \
  --interactive \
  --detach \
  --restart unless-stopped \
  lab-vue2-demo:latest
```

## Git LFS

See [Git Large File Storage](https://git-lfs.github.com/).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
