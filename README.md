# lab-vue2-demo

## Description

Opinionated Vue2 Starter Template

## Code

`vue2-demo` -> `Vue2 Demo`

## Quickstart

### Get repository

```bash
git clone --recursive https://github.com/hellozhaowenkai/lab-vue2-demo.git
```

## Docker

### Build image

```bash
docker image build --tag=lab-vue2-demo:latest .
```

### Run container

```bash
docker container run \
  --user=$(id -u) \
  --name=lab-vue2-demo \
  --publish=10202:8888 \
  --volume=$(pwd)/logs:/app/logs \
  --volume=$(pwd)/nginx.conf:/etc/nginx/nginx.conf \
  --restart=on-failure:3 \
  --interactive \
  --detach \
  lab-vue2-demo:latest
```

### Restart container

```bash
docker container restart lab-vue2-demo
```

### Delete container & image

```bash
docker container rm -f lab-vue2-demo
docker image rm lab-vue2-demo:latest
```

### View logs

```bash
docker container logs lab-vue2-demo
```

## Checklist

When you use this template, try follow the checklist to update your info properly:

- [ ] Replace all `name` sections in project
- [ ] Use a new port for docker container when deploying
- [ ] Change the `base-url` value in `config/settings.toml`
- [ ] Clean up the READMEs and update project's descriptions
- [ ] Change the title in `public/index.html`
- [ ] Change the favicon in `public`
- [ ] Remove the `.idea` and `.vscode` folder which contains the editor info

And, enjoy :)

## Git LFS

See [Git Large File Storage](https://git-lfs.github.com/).

## Vue2 project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your unit tests

```bash
npm run test:unit
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
