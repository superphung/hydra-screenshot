import Nightmare from 'nightmare'
import viewportList from 'viewport-list'

class ScreenShotHydra {
  constructor (options) {
    this.options = Object.assign({delay: 0}, options)
    this.options.delay *= 1000
    this.nightmare = Nightmare({show: false})
    this.srcs = []
  }

  src (url, sizes = ['iphone 5s'], options = {}) {
    const _sizes = this._arrayUniq(sizes.filter(/./.test, /^\d{2,4}x\d{2,4}$/i))
    const _keywords = this._arrayDiff(sizes, _sizes)

    if (!url) {
      throw new Error('Url required')
    }

    const allSizes = this._arrayUniq([
      ..._sizes,
      ...viewportList(_keywords).map(item => item.size)
    ])

    this.srcs.push({url, sizes: allSizes, options})

    return this
  }

  async run () {
    for (const src of this.srcs) {
      if (src.options && src.options.localStorage) {
        await this._setLocalStorage(src.url, src.options)
      }
      for (const size of src.sizes) {
        await this._takeScreenshot(src.url, size)
      }
    }
    await this.nightmare.end()
  }

  _takeScreenshot (url, size) {
    const sizes = size.split('x')
    const names = url.split('/')

    return this.nightmare
      .viewport(parseInt(sizes[0]), parseInt(sizes[1]))
      .goto(url)
      .wait(this.options.delay)
      .screenshot(names[names.length - 1] + sizes[0] + '-' + sizes[1] + '.png')
      .wait(300)
  }

  _setLocalStorage (url, options) {
    return this.nightmare
      .goto(url)
      .wait(this.options.delay)
      .evaluate(function (options) {
        for (const key in options.localStorage) {
          localStorage.setItem(key, options.localStorage[key])
        }
      }, options)
      .wait(300)
  }

  _arrayUniq (array) {
    return [...new Set(array)]
  }

  _arrayDiff (array1, array2) {
    return [...new Set(array1.filter(x => !array2.includes(x)))]
  }
}

export default ScreenShotHydra
module.exports = ScreenShotHydra
