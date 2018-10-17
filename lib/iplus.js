(function (root, factory) {
    /* istanbul ignore next */
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    } else { factory(null, root["iplus"] = {}); }
})(this, function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var newGuid = (function () {
        var guid = Math.floor(Math.random() * 36);
        return function newGuid(params) {
            if (params === void 0) { params = {}; }
            params.starts = params.starts || 0;
            var data = (Date.now() - params.starts).toString(36) +
                (guid++ % 36).toString(36) +
                Math.random()
                    .toString(36)
                    .slice(-2);
            if (params.hash) {
                data += (data
                    .split('')
                    .map(function (char) {
                    return parseInt(char, 36);
                })
                    .reduce(function (previous, current) {
                    return previous ^ current;
                }) % 36).toString(36);
            }
            if (params.upper) {
                data = data
                    .split('')
                    .map(function (char) {
                    return Math.random() > 0.5 ? char.toUpperCase() : char;
                })
                    .join('');
            }
            return data;
        };
    })(); /*</function>*/
    exports.newGuid = newGuid;
});
