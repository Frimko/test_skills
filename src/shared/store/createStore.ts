// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./createStoreProd'); // eslint-disable-line global-require
} else {
  module.exports = require('./createStoreDev'); // eslint-disable-line global-require
}
