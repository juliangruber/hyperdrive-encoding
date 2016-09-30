'use strict'

var test = require('tap').test
var encoding = require('./')

test('encoding', function (t) {
  var message = { content: new Buffer('foo'), type: 'index' }
  t.deepEqual(encoding.decode(encoding.encode(message)), message)

  t.throws(function () { encoding.decode(new Buffer()) })

  var buf = encoding.encode({ name: 'foo', type: 'file' })
  t.deepEqual(encoding.decode(buf), {
    name: 'foo',
    blocks: 0,
    content: null,
    ctime: 0,
    gid: 0,
    length: 0,
    linkname: '',
    mode: 0,
    mtime: 0,
    type: 'file',
    uid: 0
  })

  t.throws(function () { encoding.decode(new Buffer()) })
  t.throws(function () { encoding.encode({}) })

  t.end()
})
