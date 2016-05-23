console.log('Welcome to productrepository!')

var filesToObject = require('./files-to-object.js')
var settings = require('./settings.js')
var Firebase = require('firebase')

var firebase = Firebase.initializeApp(settings.config)
var db = firebase.database()

filesToObject(settings.filesLocation, function (err, results) {
  console.log("Uploading files from " + settings.filesLocation)
  console.log("to the firebase location " + settings.databaseLocation)
  results._updatedAt = new Date().getTime()
  results._updatedBy = 'productrepository'
  db.ref(settings.databaseLocation).set(results, function () {
    console.log('Set value to firebase ' + settings.databaseLocation)
    console.log('All done!')
    process.exit()
  })
})
