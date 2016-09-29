
# hyperdrive-encoding

  The message encoding used by
  [hyperdrive](https://github.com/mafintosh/hyperdrive).

  [![build status](https://travis-ci.org/juliangruber/hyperdrive-encoding.svg?branch=master)](http://travis-ci.org/juliangruber/hyperdrive-encoding)

## API

### .encode(type='file', message)

  Returns a serialized message.

### .decodeEntry(buf)

  Returns the parsed entry object. Throws if `buf` is of invalid type.

### .decodeIndex(buf)

  Returns the parsed index object. Throws if `buf` is of invalid type.

## Installation

```bash
$ npm install hyperdrive-encoding
```

## License

  MIT
