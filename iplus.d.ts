/**
 * @file iplus
 * @url https://github.com/zswang/iplus.git
 * Timestamp based GUID.
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.4
 * @date 2017-08-31
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
declare let newGuid: (prefix?: string, suffix?: string) => string;
export { newGuid };
