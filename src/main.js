class BrowserInfo {
  constructor (userAgent) {
    this.agent = userAgent
    this.result = {}
    this.init()
    this.result.browserVersion = this.result.browserName === 'Safari' ? this.result.systemVersion : this.result.browserVersion
    return this.result
  }

  init () {
    this.getSystemName()
    this.getBrowserName()
  }

  // 获取系统版本号
  getSystemName () {
    this.agent.replace(/^[a-z]+\/\d+\.\d+\s?\(([a-z\d\s:;\.\/_-]+)\)/i, (match, $1) => {
      // console.log(match, '===', $1)
      let result = {}
      if (/^Windows\s(?!p)/i.test($1)) {
        const [, _version] = $1.match(/NT\s(\d+\.\d+)/)
        result.systemName = 'Windows'
        switch (_version) {
          case '6.3':
            result.systemVersion = '8.1'
            break
          case '6.2':
            result.systemVersion = '8'
            break
          case '6.1':
            result.systemVersion = '7'
            break
          case '5.2':
          case '5.1':
            result.systemVersion = 'XP'
            break
          default:
            result.systemVersion = _version
        }
      } else if (/^Macintosh/i.test($1)) {
        const [, _version] = $1.match(/X\s((\d+(_|\.))+\d+)/)
        result.systemName = 'Mac'
        result.systemVersion = _version.replace(/_/g, '.')
      } else if (/^iPhone/i.test($1)) {
        const [, _version] = $1.match(/((\d+_)+\d+)/)
        result.systemName = 'iPhone'
        result.systemVersion = _version.replace(/_/g, '.')
      } else if ($1.indexOf('Android') !== -1) {
        const [, _version] = $1.match(/Android\s((\d+\.)+\d+)/)
        result.systemName = 'Android'
        result.systemVersion = _version
      } else if (/Linux\s[a-z\d_]+/.test($1)) {
        result.systemName = 'Linux'
        result.systemVersion = 'Unknown'
      } else {
        result.systemName = 'Unknown'
        result.systemVersion = 'Unknown'
      }
      this.result = {
        ...this.result,
        ...result
      }
    })
  }

  getBrowserName () {
    // 需要匹配的浏览器名称
    const browserNameList = ['QQBrowser', 'UCBrowser', 'Edge', 'OPR', 'Vivaldi', 'Firefox', 'Chrome', 'Safari']

    const regexp = browserNameList.map(name => new RegExp(`${name}\\/(\\d+\\.)+\\d+`))

    // 过滤浏览器信息
    let browser = this.agent.match(/[a-z]+\/(\d+\.)+\d+/ig).filter(_ => regexp.findIndex(v => v.test(_)) !== -1)

    // 如果最后一项不是Safari并且结果长度大于1取最后一项为当前浏览器信息
    browser = browser.length > 1 && !/^Safari/.test(browser[browser.length - 1]) ? browser.reverse() : browser

    this.result = {
      ...this.result,
      ...this._formatBrowserVersion(browser[0])
    }
  }

  _formatBrowserVersion (str) {
    if (!str) return {
      browserName: 'Unknown',
      browserVersion: 'Unknown'
    }
    const [, name, version] = str.match(/([a-z]+)\/(\d+\.\d+)/i)
    return {
      browserName: name,
      browserVersion: version
    }
  }
}

export default agent => new BrowserInfo(agent)
