'use strict'

var test = require('tap').test
var encoding = require('./')

test('encoding', function (t) {
  var message = { content: Buffer('foo') }
  t.deepEqual(encoding.decodeIndex(encoding.encode(0, message)), message)
  t.deepEqual(encoding.decodeIndex(encoding.encode('index', message)), message)

  t.throws(function () { encoding.decodeIndex(Buffer()) })

  var buf = encoding.encode(1, { name: 'foo' })
  t.deepEqual(encoding.decodeEntry(buf), {
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
  t.ok(encoding.encode(undefined, { name: 'foo' }))

  t.throws(function () { encoding.decodeEntry(Buffer()) })

  t.end()
})
