# 获取浏览器信息

> 通过`navigator.userAgent`获取操作系统版本号、浏览器版本号


## 使用方法

```js
import getBrowserInfo from '@xuanmo/browser-info'

new BrowserInfo('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36')
/**
 * @params {string} userAgent
 * @return {object}
 * @details
 * {
 *   systemName: 'Mac',
 *   systemVersion: '10.15.0',
 *   browserName: 'Chrome',
 *   browserVersion: '79.0'
 * }
 * /
```
