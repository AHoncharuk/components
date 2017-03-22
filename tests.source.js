const context = require.context('./src/blocks/', true, /.+\.spec\.js?$/)

context.keys().forEach(context)
module.exports = context
