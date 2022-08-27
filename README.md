# lab-vue2-template

## Description

Opinionated Vue2 Starter Template

## Code

`vue2-template` -> `Vue2 Template`

## Quickstart

### Get repository

```bash
# Clone repository with submodules.
git clone --recursive https://github.com/hellozhaowenkai/lab-vue2-template/
# Then into the project root directory.
cd lab-vue2-template
```

### Update the code

```bash
# Pull repository with submodules.
git pull --recurse-submodules=on-demand
# Pull repository force to overwrite local files.
git fetch --all && git reset --hard origin/main && git pull
```

### Launch container

```bash
# Run [Deploy Script](ops/deploy.sh).
sh ops/deploy.sh
```

### Restart container

```bash
# Do it if you know what it mean.
docker container restart lab-vue2-template
```

## Usage

### Checklist

When you use this template, try follow the checklist to update your info properly:

- [ ] Replace all `name` sections in project
- [ ] Use a new port for docker container when deploying
- [ ] Change the `base-url` value in `config/settings.toml`
- [ ] Update the `ops/deploy.sh` and `ops/deploy-dev.sh`
- [ ] Clean up the READMEs and update project's descriptions
- [ ] Change the title in `public/index.html`
- [ ] Change the favicon in `public`
- [ ] Remove the `.idea` and `.vscode` folder which contains the editor info

And, enjoy :)

### Git LFS

See [Git Large File Storage](https://git-lfs.github.com/).

### Vue2 project setup

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
