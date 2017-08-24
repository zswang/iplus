(function (exportName) {
  /*<function name="newGuid">*/
/**
 * @file iplus
 * @url https://github.com/zswang/iplus.git
 * Timestamp based GUID.
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.2
 * @date 2017-08-24
 * @license MIT
 */
/**
 * 比较大的概率上，生成唯一 ID
 *
 * @param prefix= 前缀
 * @param suffix= 后缀
 * @return 返回生成的 ID
 *
 * @example newGuid:base
  ```js
  console.log(/^[a-z0-9]+$/.test(iplus.newGuid()));
  // > true
  ```
 * @example newGuid:prefix+suffix
  ```js
  console.log(/^#[a-z0-9]+%$/.test(iplus.newGuid('#', '%')));
  // > true
  ```
  */
var newGuid = (function () {
    var guid = Math.floor(Math.random() * 36);
    return function newGuid(prefix, suffix) {
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = ''; }
        return prefix + Date.now().toString(36) + (guid++ % 36).toString(36) + Math.random().toString(36).slice(2, 4) + suffix;
    };
})(); /*</function>*/
  var exports = {
      newGuid: newGuid
  };
  /* istanbul ignore next */
  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }
})('iplus');