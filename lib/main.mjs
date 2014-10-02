require('source-map-support').install()

#external
  arguments
  module
  process

var
  gulp = require 'gulp'
  gutil = require 'gulp-util'
  mjs = require 'gulp-mjs'
  mocha = require 'gulp-mocha'
  es = require 'event-stream'
  path = require 'path'


module.exports = (gulp, overrides) -> do!

  var
    build-task-name = overrides.?build-task-name || 'build'
    test-task-name = overrides.?test-task-name || 'test'
    default-tasks = overrides.?default-tasks || [test-task-name]

  var
    paths = {
      src-meta: 'meta/**/*.mjs'
      src-lib: 'lib/**/*.mjs'
      src-test: 'test/**/*.mjs'
      dest-meta: 'meta'
      dest-lib: 'lib'
      dest-test: 'test'
    }

    ignore-errors = false

    on-error = err ->
      gutil.log(err.stack || (gutil.colors.red(err.message)) || err)
      if (ignore-errors)
        this.emit('end')
      else
        process.exit 1

    combine = #-> es.pipeline.apply(null, arguments)

    where = predicate ->
      es.map
        (data, callback) ->
          if (predicate(data))
            callback(null, data)
          else
            callback()

    javascript-file? = f -> f.path && (path.extname (f.path)) == '.js'
    javascriptFiles = #-> where javascript-file?

    compile = (src, dest) -> combine
      gulp.src src
      (mjs {debug: true}).on('error', on-error)
      gulp.dest dest

    test-with-reporter = reporter -> combine
      compile(paths.src-test, paths.dest-test)
      javascriptFiles()
      (mocha {reporter: reporter}).on('error', on-error)

  gulp.task
    'build-meta'
    #->
      console.log " *** build-meta"
      compile(paths.src-meta, paths.dest-meta)

  gulp.task
    build-task-name
    ;['build-meta']
    #-> compile([paths.src-meta, paths.src-lib], paths.dest-lib)

  gulp.task
    test-task-name
    [build-task-name]
    #-> testWithReporter 'spec'

  gulp.task
    'test-xunit'
    [build-task-name]
    #-> testWithReporter 'xunit-file'

  gulp.task
    'autotest'
    [build-task-name]
    #->
      ignore-errors = true
      gulp.watch
        [paths.src-meta, paths.js-meta, paths.src-lib, paths.src-test]
        [test-task-name]

  gulp.task('default', default-tasks);
