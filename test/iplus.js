
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
          
  it("newGuid:prefix+suffix", function () {
    examplejs_printLines = [];
  examplejs_print(/^#[a-z0-9]+%$/.test(iplus.newGuid('#', '%')));
  assert.equal(examplejs_printLines.join("\n"), "true"); examplejs_printLines = [];
  });
          
});
         