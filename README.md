# lab-vue2-template

[![Maintainer](https://img.shields.io/badge/Maintainer-KevInZhao-42b983.svg)](https://github.com/hellozhaowenkai/)
[![Version](https://img.shields.io/github/v/tag/hellozhaowenkai/lab-vue2-template?label=Version)](https://github.com/hellozhaowenkai/lab-vue2-template/tags/)
[![Node](https://img.shields.io/badge/Node-%3E%3D16.13-success.svg)](https://nodejs.org/)
[![Code Style](https://img.shields.io/badge/Code%20Style-Pretter-f8bc45.svg)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fe5196.svg)](https://conventionalcommits.org/)
[![License](https://img.shields.io/github/license/hellozhaowenkai/lab-vue2-template?label=License)](LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)

## Description

Opinionated Vue2 Starter Template

## Codename

`vue2-template` -> `Vue2 Template`

## Quickstart

### Get repository

```bash
# Clone repository with submodules.
git clone --recursive https://github.com/hellozhaowenkai/lab-vue2-template.git
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

- [ ] Replace all name and url sections in project
- [ ] Replace `public/favicon.ico`
- [ ] Update `README` and `package.json`
- [ ] Update `ops/deploy.sh` and `ops/deploy-dev.sh`
- [ ] Update `config/settings.toml`
- [ ] Update `.github` folder, `LICENSE`, `NOTICE` and other files which contains the open source info
- [ ] Remove `.idea` and `.vscode` folder which contains the editor info

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

## Contributing

Read through our [Contributing Guidelines](CONTRIBUTING.md) to learn about our submission process, coding rules and more.
