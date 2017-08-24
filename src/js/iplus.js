"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*<function name="newGuid">*/
/*<jdists encoding="ejs" data="../../package.json">*/
/**
 * @file <%- name %>
 <% if (typeof repository != 'undefined') { %>
 * @url <%- repository.url %>
 <% } %>
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% var now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
 * @license <%- license %>
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
exports.newGuid = newGuid;
