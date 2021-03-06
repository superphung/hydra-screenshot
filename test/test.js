import fs from 'fs'
import test from 'ava'
import Hydra from '../dist/index'

test('factory', t => {
  t.is(typeof Hydra, 'function')
})

test('src method', t => {
  const hydra = new Hydra().src('http://google.com')
  t.is(hydra.srcs[0].url, 'http://google.com')
})

test('run method', async t => {
  const hydra = new Hydra().src('http://google.com').dest(__dirname)
  await hydra.run()
  try {
    fs.accessSync('./google.com-320x568.png')
    t.pass()
  } catch (err) {
    t.fail()
  }
})
