var fs = require('fs')
var path = require('path')

var diretoryTreeToObj = function (dir, done) {
  var results = {}

  fs.readdir(dir, function (err, list) {
    if (err)
      return done(err)

    var pending = list.length

    if (!pending)
      return done(null, {name: path.basename(dir), type: 'folder', children: results})

    list.forEach(function (file) {
      file = path.resolve(dir, file)

      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          diretoryTreeToObj(file, function (err, res) {
            results[path.basename(file)] = res
            results[path.basename(file)]['_type'] = 'folder'
            if (!--pending)
              done(null, results)
          })
        } else {
          var fileObject = {
              _type: 'file',
              _fileName: path.basename(file)
          }
          var fileName = path.basename(file).split('.')[0]

          var contents = function () {
            return fs.readFileSync(file, "utf-8")
          }

          if(path.extname(file) === '.md') {
            fileObject.markdown = contents()
          }
          if(path.extname(file) === '.txt') {
            fileObject.text = contents()
          }
          if(path.extname(file) === '.html') {
            fileObject.html = contents()
          }

          results[fileName] = fileObject
          if (!--pending)
            done(null, results)
        }
      })
    })
  })
}

module.exports = diretoryTreeToObj
