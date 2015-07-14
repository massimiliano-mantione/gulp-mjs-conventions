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
        var buildTaskName, testTaskName, defaultTasks, paths, ignoreErrors, onError, combine, where, isJavascriptFile, javascriptFiles, compile, testWithReporter, _$3, _$4, _$5, _$6, _$7, val0, _$8, _$9, _$10, val1, _$11, _$12, _$13, val2, _$14, _$15;
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
                _$13: {
                    val2 = overrides;
                    if (typeof val2 !== 'undefined' && val2 !== null) {
                        _$14 = val2.defaultTasks;
                    } else {
                        _$14 = val2;
                    }
                    _$12 = _$14;
                    break _$13;
                }
                defaultTasks = _$12 || [testTaskName];
            }
            _$15: {
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
                    var _$16, _$17, _$18;
                    _$17: {
                        gutil.log(err.stack || gutil.colors.red(err.message) || err);
                        if (ignoreErrors) {
                            _$18 = this.emit('end');
                        } else {
                            _$18 = process.exit(1);
                        }
                        _$16 = _$18;
                        break _$17;
                    }
                    return _$16;
                };
                combine = function () {
                    return es.pipeline.apply(null, arguments);
                };
                where = function (predicate) {
                    return es.map(function (data, callback) {
                        var _$16;
                        if (predicate(data)) {
                            _$16 = callback(null, data);
                        } else {
                            _$16 = callback();
                        }
                        return _$16;
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
                var _$16, _$17;
                _$17: {
                    console.log(' *** build-meta');
                    _$16 = compile(paths.srcMeta, paths.destMeta);
                    break _$17;
                }
                return _$16;
            });
            gulp.task(buildTaskName, ['build-meta'], function () {
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
                var _$16, _$17;
                _$17: {
                    ignoreErrors = true;
                    _$16 = gulp.watch([
                        paths.srcMeta,
                        paths.jsMeta,
                        paths.srcLib,
                        paths.srcTest
                    ], [testTaskName]);
                    break _$17;
                }
                return _$16;
            });
            gulp.task('default', defaultTasks);
            _$3 = undefined;
            break _$4;
        }
        return _$3;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLm1qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaW5zdGFsbCIsImd1bHAiLCJndXRpbCIsIm1qcyIsIm1vY2hhIiwiZXMiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyIsIm92ZXJyaWRlcyIsInZhbDAiLCJudWxsIiwiXyQ4IiwiYnVpbGRUYXNrTmFtZSIsIl8kNiIsInZhbDEiLCJfJDExIiwidGVzdFRhc2tOYW1lIiwiXyQ5IiwidmFsMiIsIl8kMTQiLCJkZWZhdWx0VGFza3MiLCJfJDEyIiwicGF0aHMiLCJpZ25vcmVFcnJvcnMiLCJmYWxzZSIsIm9uRXJyb3IiLCJlcnIiLCJsb2ciLCJzdGFjayIsImNvbG9ycyIsInJlZCIsIm1lc3NhZ2UiLCJfJDE4IiwiZW1pdCIsInByb2Nlc3MiLCJleGl0IiwiXyQxNiIsImNvbWJpbmUiLCJwaXBlbGluZSIsImFwcGx5IiwiYXJndW1lbnRzIiwid2hlcmUiLCJwcmVkaWNhdGUiLCJtYXAiLCJkYXRhIiwiY2FsbGJhY2siLCJpc0phdmFzY3JpcHRGaWxlIiwiZiIsImV4dG5hbWUiLCJqYXZhc2NyaXB0RmlsZXMiLCJjb21waWxlIiwic3JjIiwiZGVzdCIsInRydWUiLCJvbiIsInRlc3RXaXRoUmVwb3J0ZXIiLCJyZXBvcnRlciIsInNyY1Rlc3QiLCJkZXN0VGVzdCIsInRhc2siLCJjb25zb2xlIiwic3JjTWV0YSIsImRlc3RNZXRhIiwic3JjTGliIiwiZGVzdExpYiIsIndhdGNoIiwianNNZXRhIiwiXyQzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJLElBQUEsRSxLQUFBLEUsR0FBQSxFLEtBQUEsRSxFQUFBLEUsSUFBQSxFLEdBQUEsRSxHQUFBLEUsR0FBQSxDO0FBQUE7QUFBQSxJQUFBQSxPQUFPLHNCQUFzQixDQUFDQyxPQUFPLEdBQXJDO0FBQUEsSUFFQTtBQUFBLEtBRkE7QUFBQSxJQU9BO0FBQUEsUUFDRUMsSUFBSyxHQUFFRixPQUFRLFFBQVYsQ0FEUDtBQUFBLFFBRUVHLEtB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YUFBQSxDQURBLEVBRUE7QUFBQSx1QkFBSTJDLGdCQUFpQixjQUFyQjtBQUFBLGFBRkEsRUFsRWtDO0FBQUEsWUFzRXBDdkQsSUFBSSxDQUFDMkQsSUFDSCxhQUNBLENBQUEvQyxhQUFBLENBREEsRUFFQTtBQUFBLG9CLElBQUEsRSxJQUFBO0FBQUEsZ0JBQ0U7QUFBQSxvQkFBQVcsWUFBYyxHQUFFOEIsSUFBRixDQUFkO0FBQUEsb0JBRUVqQixJQUFBLEdBREZwQyxJQUFJLENBQUNpRSxLQUNIO0FBQUEsd0JBQUMzQyxLQUFLLENBQUN1QyxPQUFQO0FBQUEsd0JBQWlCdkMsS0FBSyxDQUFDNEMsTUFBdkI7QUFBQSx3QkFBZ0M1QyxLQUFLLENBQUN5QyxNQUF0QztBQUFBLHdCQUErQ3pDLEtBQUssQ0FBQ21DLE9BQXJEO0FBQUEsdUJBQ0EsQ0FBQXpDLFlBQUEsQ0FEQSxFQUZGO0FBQUE7QUFBQSxpQkFERjtBQUFBLHVCQUNFb0IsSUFERjtBQUFBLGFBRkEsRUF2RWtDO0FBQUEsWUErRXBDcEMsSUFBSSxDQUFDMkQsSUFBSSxZQUFVdkMsWUFBVixFQS9FMkI7QUFBQSxZQUFBK0MsR0FBQSxHQUFBQyxTQUFBO0FBQUE7QUFBQSxTQUFIO0FBQUEsZUFBR0QsR0FBSDtBQUFBLEtBQXBCLENBaEJmO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuI2V4dGVybmFsXG4gIGFyZ3VtZW50c1xuICBtb2R1bGVcbiAgcHJvY2Vzc1xuXG52YXJcbiAgZ3VscCA9IHJlcXVpcmUgJ2d1bHAnXG4gIGd1dGlsID0gcmVxdWlyZSAnZ3VscC11dGlsJ1xuICBtanMgPSByZXF1aXJlICdndWxwLW1qcydcbiAgbW9jaGEgPSByZXF1aXJlICdndWxwLW1vY2hhJ1xuICBlcyA9IHJlcXVpcmUgJ2V2ZW50LXN0cmVhbSdcbiAgcGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZ3VscCwgb3ZlcnJpZGVzKSAtPiBkbyFcblxuICB2YXJcbiAgICBidWlsZC10YXNrLW5hbWUgPSBvdmVycmlkZXMuP2J1aWxkLXRhc2stbmFtZSB8fCAnYnVpbGQnXG4gICAgdGVzdC10YXNrLW5hbWUgPSBvdmVycmlkZXMuP3Rlc3QtdGFzay1uYW1lIHx8ICd0ZXN0J1xuICAgIGRlZmF1bHQtdGFza3MgPSBvdmVycmlkZXMuP2RlZmF1bHQtdGFza3MgfHwgW3Rlc3QtdGFzay1uYW1lXVxuXG4gIHZhclxuICAgIHBhdGhzID0ge1xuICAgICAgc3JjLW1ldGE6ICdtZXRhLyoqLyoubWpzJ1xuICAgICAgc3JjLWxpYjogJ2xpYi8qKi8qLm1qcydcbiAgICAgIHNyYy10ZXN0OiAndGVzdC8qKi8qLm1qcydcbiAgICAgIGRlc3QtbWV0YTogJ21ldGEnXG4gICAgICBkZXN0LWxpYjogJ2xpYidcbiAgICAgIGRlc3QtdGVzdDogJ3Rlc3QnXG4gICAgfVxuXG4gICAgaWdub3JlLWVycm9ycyA9IGZhbHNlXG5cbiAgICBvbi1lcnJvciA9IGVyciAtPlxuICAgICAgZ3V0aWwubG9nKGVyci5zdGFjayB8fCAoZ3V0aWwuY29sb3JzLnJlZChlcnIubWVzc2FnZSkpIHx8IGVycilcbiAgICAgIGlmIChpZ25vcmUtZXJyb3JzKVxuICAgICAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgICBlbHNlXG4gICAgICAgIHByb2Nlc3MuZXhpdCAxXG5cbiAgICBjb21iaW5lID0gIy0+IGVzLnBpcGVsaW5lLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcblxuICAgIHdoZXJlID0gcHJlZGljYXRlIC0+XG4gICAgICBlcy5tYXBcbiAgICAgICAgKGRhdGEsIGNhbGxiYWNrKSAtPlxuICAgICAgICAgIGlmIChwcmVkaWNhdGUoZGF0YSkpXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNhbGxiYWNrKClcblxuICAgIGphdmFzY3JpcHQtZmlsZT8gPSBmIC0+IGYucGF0aCAmJiAocGF0aC5leHRuYW1lIChmLnBhdGgpKSA9PSAnLmpzJ1xuICAgIGphdmFzY3JpcHRGaWxlcyA9ICMtPiB3aGVyZSBqYXZhc2NyaXB0LWZpbGU/XG5cbiAgICBjb21waWxlID0gKHNyYywgZGVzdCkgLT4gY29tYmluZVxuICAgICAgZ3VscC5zcmMgc3JjXG4gICAgICAobWpzIHtkZWJ1ZzogdHJ1ZX0pLm9uKCdlcnJvcicsIG9uLWVycm9yKVxuICAgICAgZ3VscC5kZXN0IGRlc3RcblxuICAgIHRlc3Qtd2l0aC1yZXBvcnRlciA9IHJlcG9ydGVyIC0+IGNvbWJpbmVcbiAgICAgIGNvbXBpbGUocGF0aHMuc3JjLXRlc3QsIHBhdGhzLmRlc3QtdGVzdClcbiAgICAgIGphdmFzY3JpcHRGaWxlcygpXG4gICAgICAobW9jaGEge3JlcG9ydGVyOiByZXBvcnRlcn0pLm9uKCdlcnJvcicsIG9uLWVycm9yKVxuXG4gIGd1bHAudGFza1xuICAgICdidWlsZC1tZXRhJ1xuICAgICMtPlxuICAgICAgY29uc29sZS5sb2cgXCIgKioqIGJ1aWxkLW1ldGFcIlxuICAgICAgY29tcGlsZShwYXRocy5zcmMtbWV0YSwgcGF0aHMuZGVzdC1tZXRhKVxuXG4gIGd1bHAudGFza1xuICAgIGJ1aWxkLXRhc2stbmFtZVxuICAgIFsnYnVpbGQtbWV0YSddXG4gICAgIy0+IGNvbXBpbGUoW3BhdGhzLnNyYy1tZXRhLCBwYXRocy5zcmMtbGliXSwgcGF0aHMuZGVzdC1saWIpXG5cbiAgZ3VscC50YXNrXG4gICAgdGVzdC10YXNrLW5hbWVcbiAgICBbYnVpbGQtdGFzay1uYW1lXVxuICAgICMtPiB0ZXN0V2l0aFJlcG9ydGVyICdzcGVjJ1xuXG4gIGd1bHAudGFza1xuICAgICd0ZXN0LXh1bml0J1xuICAgIFtidWlsZC10YXNrLW5hbWVdXG4gICAgIy0+IHRlc3RXaXRoUmVwb3J0ZXIgJ3h1bml0LWZpbGUnXG5cbiAgZ3VscC50YXNrXG4gICAgJ2F1dG90ZXN0J1xuICAgIFtidWlsZC10YXNrLW5hbWVdXG4gICAgIy0+XG4gICAgICBpZ25vcmUtZXJyb3JzID0gdHJ1ZVxuICAgICAgZ3VscC53YXRjaFxuICAgICAgICBbcGF0aHMuc3JjLW1ldGEsIHBhdGhzLmpzLW1ldGEsIHBhdGhzLnNyYy1saWIsIHBhdGhzLnNyYy10ZXN0XVxuICAgICAgICBbdGVzdC10YXNrLW5hbWVdXG5cbiAgZ3VscC50YXNrKCdkZWZhdWx0JywgZGVmYXVsdC10YXNrcyk7XG5cbiJdfQ==