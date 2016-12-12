console.log('Welcome to productrepository!')

var filesToObject = require('./files-to-object.js')
var settings = require('./settings.js')
var Firebase = require('firebase')
var fs = require('fs');

var logLocation = (process.env.CIRCLE_ARTIFACTS || 'artifacts') + '/results.json'

var firebase = Firebase.initializeApp(settings.config)
var db = firebase.database()

filesToObject(settings.filesLocation, function (err, results) {
  console.log("Uploading files from " + settings.filesLocation)
  console.log("to the firebase location " + settings.databaseLocation)
  results._updatedAt = new Date().getTime()
  results._updatedBy = 'productrepository'
  console.log('Set value to firebase ' + settings.databaseLocation)
  fs.writeFile('results.json', logLocation, function (err) {
    if (err)
      return console.error('Error writing output!')
    console.log('Written output to results.json in the Circle Artifacts folder')
  })
  db.ref(settings.databaseLocation).set(results, function () {
    console.log('All done!')
    process.exit()
  })
})
