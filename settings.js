var settings = {}

require('dotenv').config({silent: true})

var base64config
if (process.env.BASE64_CONFIG) {
  var buffer = new Buffer(process.env.BASE64_CONFIG, 'base64')
  base64config = JSON.parse(buffer.toString())
  console.log('Decoded BASE64 config from environment variable')
}

settings.config = base64config || require('./config.json')

settings.filesLocation = process.env.FILES_LOCATION || settings.config.filesLocation || 'projects'
settings.repoName = process.env.REPONAME || process.env.CIRCLE_PROJECT_REPONAME || settings.config.repoName || config.projectName || null
settings.branchName = process.env.BRANCHNAME || process.env.CIRCLE_BRANCH || settings.config.branchName || null
settings.databaseRoot = process.env.DATABASE_ROOT || settings.config.databaseRoot || 'productFiles'
settings.databaseLocation = settings.databaseRoot
if (settings.repoName) {
  settings.databaseLocation = settings.databaseLocation + '/' + settings.repoName
}
if (settings.branchName) {
  settings.databaseLocation = settings.databaseLocation + '/' + settings.branchName
}

module.exports = settings
