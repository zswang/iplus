(function (exportName) {

  /*<jdists encoding="fndep" import="./js/iplus.js"
    depend="newGuid" />*/

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