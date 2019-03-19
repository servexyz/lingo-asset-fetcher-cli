# Node-Starter

> Starting point for modules being published to npmjs.com & node servers

## Getting Started

### Install

```bash
git clone git@github.com:servexyz/node-starter
```

---

## Use

##### Developing

> TLDR:
> npm run dev

- **Module with babel compile & livereload?**: `npm run dev:liveReloadedModule`
- **Module with babel compile**: `npm run dev:builtModule`
- **Module without babel compile**: `npm run dev:vanillaModule`
- **Server with babel compile & livereload?**: `npm run dev:server`
  > dev:server is having issues. For liveReload functionality, stick with `dev:liveReloadedModule`. Read about issue [here](https://github.com/servexyz/node-starter/issues/12)

##### Production

> TLDR:
> npm run build ...or... npm run publish

- **Build**: `npm run build`
- **Publish**: `npm run publish` (this publishes module to NPM)

##### Testing

> TLDR:
> npm run test

- **Test Ava Once**: `npm run test:ava`
- **Test Ava with Live Reload**: `npm run test:liveReloadedAva`

---

## Docs

##### NPM.MD

You'll notice that README.md is symlinked.

When forking, remove README.md. The `NPM.md` file will still exist in docs (that way you don't lose initial reference)

##### Demo

![node-starter cli demo](https://github.com/servexyz/node-starter/blob/master/docs/node-starter-scripts.gif)

---

## Questions

_Why are server & module separated?_

- Module is compiled/run via CLI (using @babel/cli & nodemon)
- Server is compiled & run via webpack config (using webpack & nodemon-webpack-plugin)

---

## Related

**Internal**

- [@servexyz/cli-starter](https://github.com/servexyz/cli-starter)
- [@servexyz/service-starter](https://github.com/servexyz/service-starter)
- [@servexyz/npm-starter-sample-module](https://github.com/servexyz/npm-starter-sample-module)

> The purpose of npm-starter-sample-module is to ensure that imports are working (ie. confirm that webpack is building libraries properly)
