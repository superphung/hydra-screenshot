# Hydra Screenshot

![travis build](https://img.shields.io/travis/superphung/hydra-screenshot.svg)

Hydra screenshot is a wrapper around [nightmare](https://github.com/segmentio/nightmare) and deeply inspired by [pageres](https://github.com/sindresorhus/pageres). Hydra capture screenshot in many resolution and support localStorage.

## Install

```
$ npm install hydra-screenshot --save
```

## Usage

```js
const Hydra = require('hydra-screenshot');

const hydra = new Hydra({delay: 2})
  .src('http://netflix.com', ['1280x1024', '1920x1080'], {localStorage: {token: '123'}})
  .src('http://google.com', ['iphone 5s', 'xiaomi mi-3'])
  .run()
  .then(() => console.log('done'));
```

## API

### Hydra([options])

#### options

##### delay

Type: `number` *(seconds)*

Delay between each page

### hydra.src(url, [sizes], [options])

#### url

*required*
Type: `string`

#### sizes

Type: `array`

Use a `<width>x<height>` notation or a keyword.

A keyword is a version of a device from this [list](http://viewportsizes.com).

#### options

Type: `object`

##### localStorage

Type: `object`

Map of `key: value`
