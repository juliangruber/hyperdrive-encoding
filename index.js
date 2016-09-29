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

exports.decodeEntry = function (buf) {
  var type = buf[0]
  if (type > 4) throw new Error('Unknown message type: ' + type)
  var entry = messages.Entry.decode(buf, 1)
  entry.type = toTypeString(type)
  return entry
}

exports.decodeIndex = function (buf) {
  var type = buf[0]
  if (type !== 0) throw new Error('Expected block to be index')
  return messages.Index.decode(buf, 1)
}

exports.encode = function (type, message) {
  if (typeof type !== 'number') type = toTypeNumber(type)
  var enc = TYPES[type]
  var buf = Buffer(enc.encodingLength(message) + 1)
  enc.encode(message, buf, 1)
  buf[0] = type
  return buf
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
  t = t || 'file'
  switch (t) {
    case 'index': return 0
    case 'file': return 1
    case 'directory': return 2
    case 'symlink': return 3
    case 'hardlink': return 4
  }

  return -1
}
