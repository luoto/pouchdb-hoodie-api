'use strict'

var toDoc = require('../utils/to-doc')

module.exports = function addMany (objects) {
  var docs = objects.map(toDoc)

  return this.bulkDocs(docs)

  .then(function (responses) {
    return responses.map(function (response, i) {
      if (response instanceof Error) {
        return response
      }

      objects[i].id = response.id
      objects[i]._rev = response.rev
      return objects[i]
    })
  })
}
