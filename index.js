'use strict'

var protobuf = require('protocol-buffers')
var fs = require('fs')
var join = require('path').join

var messages = protobuf(fs.readFileSync(join(__dirname, 'schema.proto')))
var TYPES = [
  messages.Index,
  messages.Entry, // file
  messages.Entry, // directory
  messages.Entry, // symlink
  messages.Entry  // hardlink
]

module.exports = {
  decode: decode,
  encode: encode,
  encodingLength: encodingLength
}

function getEncoding (type) {
  var enc = TYPES[type]
  if (!enc) throw new Error('Unknown message type: ' + toTypeString(type))
  return enc
}

function decode (buffer, start, end) {
  start = start || 0
  end = end || buffer.length
  var type = buffer[start]
  var enc = getEncoding(type)
  var obj = enc.decode(buffer, 1 + start, end)
  obj.type = toTypeString(type)
  decode.bytes = end - start - 1
  return obj
}

function encode (obj, buffer, offset) {
  offset = offset || 0
  var typeString = obj.type
  var type = toTypeNumber(typeString || 'file')
  var enc = getEncoding(type)
  var length = enc.encodingLength(obj) + 1
  var buf = buffer || Buffer(length + offset)
  enc.encode(obj, buf, 1 + offset)
  buf[offset] = type
  encode.bytes = length
  return buf
}

function encodingLength (obj) {
  return getEncoding(toTypeNumber(obj.type || 'file')).encodingLength(obj) + 1
}

function toTypeString (t) {
  switch (t) {
    case 0: return 'index'
    case 1: return 'file'
    case 2: return 'directory'
    case 3: return 'symlink'
    case 4: return 'hardlink'
  }
  return 'unknown'
}

function toTypeNumber (t) {
  switch (t) {
    case 'index': return 0
    case 'file': return 1
    case 'directory': return 2
    case 'symlink': return 3
    case 'hardlink': return 4
  }
  return -1
}
