var gulp, gutil, mjs, mocha, es, path, _$0, _$1, _$2;
_$0: {
    require('source-map-support').install();
    _$1: {
    }
    _$2: {
        gulp = require('gulp');
        gutil = require('gulp-util');
        mjs = require('gulp-mjs');
        mocha = require('gulp-mocha');
        es = require('event-stream');
        path = require('path');
    }
    module.exports = function (gulp, overrides) {
        var buildTaskName, testTaskName, paths, ignoreErrors, onError, combine, where, isJavascriptFile, javascriptFiles, compile, testWithReporter, _$3, _$4, _$5, _$6, _$7, val0, _$8, _$9, _$10, val1, _$11, _$12;
        _$4: {
            _$5: {
                _$7: {
                    val0 = overrides;
                    if (typeof val0 !== 'undefined' && val0 !== null) {
                        _$8 = val0.buildTaskName;
                    } else {
                        _$8 = val0;
                    }
                    _$6 = _$8;
                    break _$7;
                }
                buildTaskName = _$6 || 'build';
                _$10: {
                    val1 = overrides;
                    if (typeof val1 !== 'undefined' && val1 !== null) {
                        _$11 = val1.testTaskName;
                    } else {
                        _$11 = val1;
                    }
                    _$9 = _$11;
                    break _$10;
                }
                testTaskName = _$9 || 'test';
            }
            _$12: {
                paths = {
                    'srcMeta': 'meta/**/*.mjs',
                    'srcLib': 'lib/**/*.mjs',
                    'srcTest': 'test/**/*.mjs',
                    'destMeta': 'meta',
                    'destLib': 'lib',
                    'destTest': 'test'
                };
                ignoreErrors = false;
                onError = function (err) {
                    var _$13, _$14, _$15;
                    _$14: {
                        gutil.log(err.stack || gutil.colors.red(err.message) || err);
                        if (ignoreErrors) {
                            _$15 = this.emit('end');
                        } else {
                            _$15 = process.exit(1);
                        }
                        _$13 = _$15;
                        break _$14;
                    }
                    return _$13;
                };
                combine = function () {
                    return es.pipeline.apply(null, arguments);
                };
                where = function (predicate) {
                    return es.map(function (data, callback) {
                        var _$13;
                        if (predicate(data)) {
                            _$13 = callback(null, data);
                        } else {
                            _$13 = callback();
                        }
                        return _$13;
                    });
                };
                isJavascriptFile = function (f) {
                    return f.path && path.extname(f.path) === '.js';
                };
                javascriptFiles = function () {
                    return where(isJavascriptFile);
                };
                compile = function (src, dest) {
                    return combine(gulp.src(src), mjs({ 'debug': true }).on('error', onError), gulp.dest(dest));
                };
                testWithReporter = function (reporter) {
                    return combine(compile(paths.srcTest, paths.destTest), javascriptFiles(), mocha({ 'reporter': reporter }).on('error', onError));
                };
            }
            gulp.task('build-meta', function () {
                var _$13, _$14;
                _$14: {
                    console.log(' *** build-meta');
                    _$13 = compile(paths.srcMeta, paths.destMeta);
                    break _$14;
                }
                return _$13;
            });
            gulp.task(buildTaskName, function () {
                return compile([
                    paths.srcMeta,
                    paths.srcLib
                ], paths.destLib);
            });
            gulp.task(testTaskName, [buildTaskName], function () {
                return testWithReporter('spec');
            });
            gulp.task('test-xunit', [buildTaskName], function () {
                return testWithReporter('xunit-file');
            });
            gulp.task('autotest', [buildTaskName], function () {
                var _$13, _$14;
                _$14: {
                    ignoreErrors = true;
                    _$13 = gulp.watch([
                        paths.srcMeta,
                        paths.jsMeta,
                        paths.srcLib,
                        paths.srcTest
                    ], [testTaskName]);
                    break _$14;
                }
                return _$13;
            });
            gulp.task('default', [testTaskName]);
            _$3 = undefined;
            break _$4;
        }
        return _$3;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLm1qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaW5zdGFsbCIsImd1bHAiLCJndXRpbCIsIm1qcyIsIm1vY2hhIiwiZXMiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyIsIm92ZXJyaWRlcyIsInZhbDAiLCJudWxsIiwiXyQ4IiwiYnVpbGRUYXNrTmFtZSIsIl8kNiIsInZhbDEiLCJfJDExIiwidGVzdFRhc2tOYW1lIiwiXyQ5IiwicGF0aHMiLCJpZ25vcmVFcnJvcnMiLCJmYWxzZSIsIm9uRXJyb3IiLCJlcnIiLCJsb2ciLCJzdGFjayIsImNvbG9ycyIsInJlZCIsIm1lc3NhZ2UiLCJfJDE1IiwiZW1pdCIsInByb2Nlc3MiLCJleGl0IiwiXyQxMyIsImNvbWJpbmUiLCJwaXBlbGluZSIsImFwcGx5IiwiYXJndW1lbnRzIiwid2hlcmUiLCJwcmVkaWNhdGUiLCJtYXAiLCJkYXRhIiwiY2FsbGJhY2siLCJpc0phdmFzY3JpcHRGaWxlIiwiZiIsImV4dG5hbWUiLCJqYXZhc2NyaXB0RmlsZXMiLCJjb21waWxlIiwic3JjIiwiZGVzdCIsInRydWUiLCJvbiIsInRlc3RXaXRoUmVwb3J0ZXIiLCJyZXBvcnRlciIsInNyY1Rlc3QiLCJkZXN0VGVzdCIsInRhc2siLCJjb25zb2xlIiwic3JjTWV0YSIsImRlc3RNZXRhIiwic3JjTGliIiwiZGVzdExpYiIsIndhdGNoIiwianNNZXRhIiwiXyQzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJLElBQUEsRSxLQUFBLEUsR0FBQSxFLEtBQUEsRSxFQUFBLEUsSUFBQSxFLEdBQUEsRSxHQUFBLEUsR0FBQSxDO0FBQUE7QUFBQSxJQUFBQSxPQUFPLHNCQUFzQixDQUFDQyxPQUFPLEdBQXJDO0FBQUEsSUFFQTtBQUFBLEtBRkE7QUFBQSxJQU9BO0FBQUEsUUFDRUMsSUFBSyxHQUFFRixPQUFRLFFBQVYsQ0FEUDtBQUFBLFFBRUVHLEtBQU0sR0FBRUgsT0FBUSxhQUFWLENBRlI7QUFBQSxRQUdFSSxH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bUMsT0FBckQ7QUFBQSx1QkFDQSxDQUFBckMsWUFBQSxDQURBLEVBRkY7QUFBQTtBQUFBLGlCQURGO0FBQUEsdUJBQ0VnQixJQURGO0FBQUEsYUFGQSxFQXRFa0M7QUFBQSxZQThFcENoQyxJQUFJLENBQUN1RCxJQUFJLFlBQVUsQ0FBRXZDLFlBQUYsQ0FBVixFQTlFMkI7QUFBQSxZQUFBK0MsR0FBQSxHQUFBQyxTQUFBO0FBQUE7QUFBQSxTQUFIO0FBQUEsZUFBR0QsR0FBSDtBQUFBLEtBQXBCLENBaEJmO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuI2V4dGVybmFsXG4gIGFyZ3VtZW50c1xuICBtb2R1bGVcbiAgcHJvY2Vzc1xuXG52YXJcbiAgZ3VscCA9IHJlcXVpcmUgJ2d1bHAnXG4gIGd1dGlsID0gcmVxdWlyZSAnZ3VscC11dGlsJ1xuICBtanMgPSByZXF1aXJlICdndWxwLW1qcydcbiAgbW9jaGEgPSByZXF1aXJlICdndWxwLW1vY2hhJ1xuICBlcyA9IHJlcXVpcmUgJ2V2ZW50LXN0cmVhbSdcbiAgcGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZ3VscCwgb3ZlcnJpZGVzKSAtPiBkbyFcblxuICB2YXJcbiAgICBidWlsZC10YXNrLW5hbWUgPSBvdmVycmlkZXMuP2J1aWxkLXRhc2stbmFtZSB8fCAnYnVpbGQnXG4gICAgdGVzdC10YXNrLW5hbWUgPSBvdmVycmlkZXMuP3Rlc3QtdGFzay1uYW1lIHx8ICd0ZXN0J1xuXG4gIHZhclxuICAgIHBhdGhzID0ge1xuICAgICAgc3JjLW1ldGE6ICdtZXRhLyoqLyoubWpzJ1xuICAgICAgc3JjLWxpYjogJ2xpYi8qKi8qLm1qcydcbiAgICAgIHNyYy10ZXN0OiAndGVzdC8qKi8qLm1qcydcbiAgICAgIGRlc3QtbWV0YTogJ21ldGEnXG4gICAgICBkZXN0LWxpYjogJ2xpYidcbiAgICAgIGRlc3QtdGVzdDogJ3Rlc3QnXG4gICAgfVxuXG4gICAgaWdub3JlLWVycm9ycyA9IGZhbHNlXG5cbiAgICBvbi1lcnJvciA9IGVyciAtPlxuICAgICAgZ3V0aWwubG9nKGVyci5zdGFjayB8fCAoZ3V0aWwuY29sb3JzLnJlZChlcnIubWVzc2FnZSkpIHx8IGVycilcbiAgICAgIGlmIChpZ25vcmUtZXJyb3JzKVxuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgICBlbHNlXG4gICAgICAgIHByb2Nlc3MuZXhpdCAxXG5cbiAgICBjb21iaW5lID0gIy0+IGVzLnBpcGVsaW5lLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcblxuICAgIHdoZXJlID0gcHJlZGljYXRlIC0+XG4gICAgICBlcy5tYXBcbiAgICAgICAgKGRhdGEsIGNhbGxiYWNrKSAtPlxuICAgICAgICAgIGlmIChwcmVkaWNhdGUoZGF0YSkpXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNhbGxiYWNrKClcblxuICAgIGphdmFzY3JpcHQtZmlsZT8gPSBmIC0+IGYucGF0aCAmJiAocGF0aC5leHRuYW1lIChmLnBhdGgpKSA9PSAnLmpzJ1xuICAgIGphdmFzY3JpcHRGaWxlcyA9ICMtPiB3aGVyZSBqYXZhc2NyaXB0LWZpbGU/XG5cbiAgICBjb21waWxlID0gKHNyYywgZGVzdCkgLT4gY29tYmluZVxuICAgICAgZ3VscC5zcmMgc3JjXG4gICAgICAobWpzIHtkZWJ1ZzogdHJ1ZX0pLm9uKCdlcnJvcicsIG9uLWVycm9yKVxuICAgICAgZ3VscC5kZXN0IGRlc3RcblxuICAgIHRlc3Qtd2l0aC1yZXBvcnRlciA9IHJlcG9ydGVyIC0+IGNvbWJpbmVcbiAgICAgIGNvbXBpbGUocGF0aHMuc3JjLXRlc3QsIHBhdGhzLmRlc3QtdGVzdClcbiAgICAgIGphdmFzY3JpcHRGaWxlcygpXG4gICAgICAobW9jaGEge3JlcG9ydGVyOiByZXBvcnRlcn0pLm9uKCdlcnJvcicsIG9uLWVycm9yKVxuXG4gIGd1bHAudGFza1xuICAgICdidWlsZC1tZXRhJ1xuICAgICMtPlxuICAgICAgY29uc29sZS5sb2cgXCIgKioqIGJ1aWxkLW1ldGFcIlxuICAgICAgY29tcGlsZShwYXRocy5zcmMtbWV0YSwgcGF0aHMuZGVzdC1tZXRhKVxuXG4gIGd1bHAudGFza1xuICAgIGJ1aWxkLXRhc2stbmFtZVxuICAgIDtbJ2J1aWxkLW1ldGEnXVxuICAgICMtPiBjb21waWxlKFtwYXRocy5zcmMtbWV0YSwgcGF0aHMuc3JjLWxpYl0sIHBhdGhzLmRlc3QtbGliKVxuXG4gIGd1bHAudGFza1xuICAgIHRlc3QtdGFzay1uYW1lXG4gICAgW2J1aWxkLXRhc2stbmFtZV1cbiAgICAjLT4gdGVzdFdpdGhSZXBvcnRlciAnc3BlYydcblxuICBndWxwLnRhc2tcbiAgICAndGVzdC14dW5pdCdcbiAgICBbYnVpbGQtdGFzay1uYW1lXVxuICAgICMtPiB0ZXN0V2l0aFJlcG9ydGVyICd4dW5pdC1maWxlJ1xuXG4gIGd1bHAudGFza1xuICAgICdhdXRvdGVzdCdcbiAgICBbYnVpbGQtdGFzay1uYW1lXVxuICAgICMtPlxuICAgICAgaWdub3JlLWVycm9ycyA9IHRydWVcbiAgICAgIGd1bHAud2F0Y2hcbiAgICAgICAgW3BhdGhzLnNyYy1tZXRhLCBwYXRocy5qcy1tZXRhLCBwYXRocy5zcmMtbGliLCBwYXRocy5zcmMtdGVzdF1cbiAgICAgICAgW3Rlc3QtdGFzay1uYW1lXVxuXG4gIGd1bHAudGFzaygnZGVmYXVsdCcsIFt0ZXN0LXRhc2stbmFtZV0pO1xuXG4iXX0=