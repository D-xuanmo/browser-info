# 此仓库不再维护，已转到 https://github.com/D-xuanmo/javascript-utils/blob/main/src/ua.ts

# 获取浏览器信息
> 通过`navigator.userAgent`获取操作系统版本号、浏览器版本号

## 使用方法

```js
import getBrowserInfo from '@xuanmo/browser-info'

getBrowserInfo('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36')
// 返回结果示例
// {
//   systemName: 'Mac',
//   systemVersion: '10.15.0',
//   browserName: 'Chrome',
//   browserVersion: '79.0',
//   browserEnName: 'Chrome'
// }
```
