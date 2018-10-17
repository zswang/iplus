/*<function name="newGuid">*/
/**
 * @file iplus
 * @url https://github.com/zswang/iplus.git
 * Timestamp based GUID.
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 1.0.1
 * @date 2018-10-17
 * @license MIT
 */
/**
 * GUID 生成规则
 */
export interface GuidParams {
  /**
   * 时间起点
   */
  starts?: number
  /**
   * 是否加入 hash
   */
  hash?: boolean
  /**
   * 是否随机大写
   */
  upper?: boolean
}
/**
 * 比较大的概率上，生成唯一 ID
 *
 * @param starts= 起始时间，单位：毫秒，默认：0
 * @return 返回生成的 ID
 *
 * @example newGuid:base
  ```js
    console.log(/^[a-z0-9]+$/.test(iplus.newGuid()));
    // > true
  ```
 * @example newGuid:starts, hash
  ```js
    console.log(/^[a-z0-9]{4,5}$/i.test(iplus.newGuid({
      starts: Date.now(),
      hash: true,
    })));
    // > true
  ```
 * @example newGuid:upper
  ```js
    for (var i = 0; i < 100; i++) {
      var guid = /^[a-z0-9]{4,5}$/i.test(iplus.newGuid({
        hash: true,
        upper: true,
      }));
      console.log(guid);
      if (/[A-Z]/.test(guid)) {
        console.info(guid)
        // > true
        break;
      }
    }
  ```
  */
let newGuid = (function() {
  let guid = Math.floor(Math.random() * 36)
  return function newGuid(params: GuidParams = {}): string {
    params.starts = params.starts || 0
    let data =
      (Date.now() - params.starts).toString(36) +
      (guid++ % 36).toString(36) +
      Math.random()
        .toString(36)
        .slice(-2)
    if (params.hash) {
      data += (
        data
          .split('')
          .map(char => {
            return parseInt(char, 36)
          })
          .reduce((previous, current) => {
            return previous ^ current
          }) % 36
      ).toString(36)
    }
    if (params.upper) {
      data = data
        .split('')
        .map(char => {
          return Math.random() > 0.5 ? char.toUpperCase() : char
        })
        .join('')
    }
    return data
  }
})() /*</function>*/
export { newGuid }
