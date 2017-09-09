
global.iplus = require('../')
      

describe("src/iplus.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("newGuid:base", function () {
    examplejs_printLines = [];
    examplejs_print(/^[a-z0-9]+$/.test(iplus.newGuid()));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("newGuid:starts, hash", function () {
    examplejs_printLines = [];
    examplejs_print(/^[a-z0-9]{4,5}$/i.test(iplus.newGuid({
      starts: Date.now(),
      hash: true,
    })));
    assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
  it("newGuid:upper", function () {
    examplejs_printLines = [];
    for (var i = 0; i < 100; i++) {
      var guid = /^[a-z0-9]{4,5}$/i.test(iplus.newGuid({
        hash: true,
        upper: true,
      }));
      examplejs_print(guid);
      if (/[A-Z]/.test(guid)) {
        console.info(guid)
        assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
        break;
      }
    }
  });
          
});
         