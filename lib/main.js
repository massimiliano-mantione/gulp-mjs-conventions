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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLm1qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaW5zdGFsbCIsImd1bHAiLCJndXRpbCIsIm1qcyIsIm1vY2hhIiwiZXMiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyIsIm92ZXJyaWRlcyIsInZhbDAiLCJudWxsIiwiXyQ4IiwiYnVpbGRUYXNrTmFtZSIsIl8kNiIsInZhbDEiLCJfJDExIiwidGVzdFRhc2tOYW1lIiwiXyQ5IiwidmFsMiIsIl8kMTQiLCJkZWZhdWx0VGFza3MiLCJfJDEyIiwicGF0aHMiLCJpZ25vcmVFcnJvcnMiLCJmYWxzZSIsIm9uRXJyb3IiLCJlcnIiLCJsb2ciLCJzdGFjayIsImNvbG9ycyIsInJlZCIsIm1lc3NhZ2UiLCJfJDE4IiwiZW1pdCIsInByb2Nlc3MiLCJleGl0IiwiXyQxNiIsImNvbWJpbmUiLCJwaXBlbGluZSIsImFwcGx5IiwiYXJndW1lbnRzIiwid2hlcmUiLCJwcmVkaWNhdGUiLCJtYXAiLCJkYXRhIiwiY2FsbGJhY2siLCJpc0phdmFzY3JpcHRGaWxlIiwiZiIsImV4dG5hbWUiLCJqYXZhc2NyaXB0RmlsZXMiLCJjb21waWxlIiwic3JjIiwiZGVzdCIsInRydWUiLCJvbiIsInRlc3RXaXRoUmVwb3J0ZXIiLCJyZXBvcnRlciIsInNyY1Rlc3QiLCJkZXN0VGVzdCIsInRhc2siLCJjb25zb2xlIiwic3JjTWV0YSIsImRlc3RNZXRhIiwic3JjTGliIiwiZGVzdExpYiIsIndhdGNoIiwianNNZXRhIiwiXyQzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJLElBQUEsRSxLQUFBLEUsR0FBQSxFLEtBQUEsRSxFQUFBLEUsSUFBQSxFLEdBQUEsRSxHQUFBLEUsR0FBQSxDO0FBQUE7QUFBQSxJQUFBQSxPQUFPLHNCQUFzQixDQUFDQyxPQUFPLEdBQXJDO0FBQUEsSUFFQTtBQUFBLEtBRkE7QUFBQSxJQU9BO0FBQUEsUUFDRUMsSUFBSyxHQUFFRixPQUFRLFFBQVYsQ0FEUDtBQUFBLFFBRUVHLEtB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RUFFQTtBQUFBLHVCQUFJMkMsZ0JBQWlCLGNBQXJCO0FBQUEsYUFGQSxFQWxFa0M7QUFBQSxZQXNFcEN2RCxJQUFJLENBQUMyRCxJQUNILGFBQ0EsQ0FBQS9DLGFBQUEsQ0FEQSxFQUVBO0FBQUEsb0IsSUFBQSxFLElBQUE7QUFBQSxnQkFDRTtBQUFBLG9CQUFBVyxZQUFjLEdBQUU4QixJQUFGLENBQWQ7QUFBQSxvQkFFRWpCLElBQUEsR0FERnBDLElBQUksQ0FBQ2lFLEtBQ0g7QUFBQSx3QkFBQzNDLEtBQUssQ0FBQ3VDLE9BQVA7QUFBQSx3QkFBaUJ2QyxLQUFLLENBQUM0QyxNQUF2QjtBQUFBLHdCQUFnQzVDLEtBQUssQ0FBQ3lDLE1BQXRDO0FBQUEsd0JBQStDekMsS0FBSyxDQUFDbUMsT0FBckQ7QUFBQSx1QkFDQSxDQUFBekMsWUFBQSxDQURBLEVBRkY7QUFBQTtBQUFBLGlCQURGO0FBQUEsdUJBQ0VvQixJQURGO0FBQUEsYUFGQSxFQXZFa0M7QUFBQSxZQStFcENwQyxJQUFJLENBQUMyRCxJQUFJLFlBQVV2QyxZQUFWLEVBL0UyQjtBQUFBLFlBQUErQyxHQUFBLEdBQUFDLFNBQUE7QUFBQTtBQUFBLFNBQUg7QUFBQSxlQUFHRCxHQUFIO0FBQUEsS0FBcEIsQ0FoQmY7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKVxuXG4jZXh0ZXJuYWxcbiAgYXJndW1lbnRzXG4gIG1vZHVsZVxuICBwcm9jZXNzXG5cbnZhclxuICBndWxwID0gcmVxdWlyZSAnZ3VscCdcbiAgZ3V0aWwgPSByZXF1aXJlICdndWxwLXV0aWwnXG4gIG1qcyA9IHJlcXVpcmUgJ2d1bHAtbWpzJ1xuICBtb2NoYSA9IHJlcXVpcmUgJ2d1bHAtbW9jaGEnXG4gIGVzID0gcmVxdWlyZSAnZXZlbnQtc3RyZWFtJ1xuICBwYXRoID0gcmVxdWlyZSAncGF0aCdcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChndWxwLCBvdmVycmlkZXMpIC0+IGRvIVxuXG4gIHZhclxuICAgIGJ1aWxkLXRhc2stbmFtZSA9IG92ZXJyaWRlcy4/YnVpbGQtdGFzay1uYW1lIHx8ICdidWlsZCdcbiAgICB0ZXN0LXRhc2stbmFtZSA9IG92ZXJyaWRlcy4/dGVzdC10YXNrLW5hbWUgfHwgJ3Rlc3QnXG4gICAgZGVmYXVsdC10YXNrcyA9IG92ZXJyaWRlcy4/ZGVmYXVsdC10YXNrcyB8fCBbdGVzdC10YXNrLW5hbWVdXG5cbiAgdmFyXG4gICAgcGF0aHMgPSB7XG4gICAgICBzcmMtbWV0YTogJ21ldGEvKiovKi5tanMnXG4gICAgICBzcmMtbGliOiAnbGliLyoqLyoubWpzJ1xuICAgICAgc3JjLXRlc3Q6ICd0ZXN0LyoqLyoubWpzJ1xuICAgICAgZGVzdC1tZXRhOiAnbWV0YSdcbiAgICAgIGRlc3QtbGliOiAnbGliJ1xuICAgICAgZGVzdC10ZXN0OiAndGVzdCdcbiAgICB9XG5cbiAgICBpZ25vcmUtZXJyb3JzID0gZmFsc2VcblxuICAgIG9uLWVycm9yID0gZXJyIC0+XG4gICAgICBndXRpbC5sb2coZXJyLnN0YWNrIHx8IChndXRpbC5jb2xvcnMucmVkKGVyci5tZXNzYWdlKSkgfHwgZXJyKVxuICAgICAgaWYgKGlnbm9yZS1lcnJvcnMpXG4gICAgICAgIHRoaXMuZW1pdCgnZW5kJylcbiAgICAgIGVsc2VcbiAgICAgICAgcHJvY2Vzcy5leGl0IDFcblxuICAgIGNvbWJpbmUgPSAjLT4gZXMucGlwZWxpbmUuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuXG4gICAgd2hlcmUgPSBwcmVkaWNhdGUgLT5cbiAgICAgIGVzLm1hcFxuICAgICAgICAoZGF0YSwgY2FsbGJhY2spIC0+XG4gICAgICAgICAgaWYgKHByZWRpY2F0ZShkYXRhKSlcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgamF2YXNjcmlwdC1maWxlPyA9IGYgLT4gZi5wYXRoICYmIChwYXRoLmV4dG5hbWUgKGYucGF0aCkpID09ICcuanMnXG4gICAgamF2YXNjcmlwdEZpbGVzID0gIy0+IHdoZXJlIGphdmFzY3JpcHQtZmlsZT9cblxuICAgIGNvbXBpbGUgPSAoc3JjLCBkZXN0KSAtPiBjb21iaW5lXG4gICAgICBndWxwLnNyYyBzcmNcbiAgICAgIChtanMge2RlYnVnOiB0cnVlfSkub24oJ2Vycm9yJywgb24tZXJyb3IpXG4gICAgICBndWxwLmRlc3QgZGVzdFxuXG4gICAgdGVzdC13aXRoLXJlcG9ydGVyID0gcmVwb3J0ZXIgLT4gY29tYmluZVxuICAgICAgY29tcGlsZShwYXRocy5zcmMtdGVzdCwgcGF0aHMuZGVzdC10ZXN0KVxuICAgICAgamF2YXNjcmlwdEZpbGVzKClcbiAgICAgIChtb2NoYSB7cmVwb3J0ZXI6IHJlcG9ydGVyfSkub24oJ2Vycm9yJywgb24tZXJyb3IpXG5cbiAgZ3VscC50YXNrXG4gICAgJ2J1aWxkLW1ldGEnXG4gICAgIy0+XG4gICAgICBjb25zb2xlLmxvZyBcIiAqKiogYnVpbGQtbWV0YVwiXG4gICAgICBjb21waWxlKHBhdGhzLnNyYy1tZXRhLCBwYXRocy5kZXN0LW1ldGEpXG5cbiAgZ3VscC50YXNrXG4gICAgYnVpbGQtdGFzay1uYW1lXG4gICAgO1snYnVpbGQtbWV0YSddXG4gICAgIy0+IGNvbXBpbGUoW3BhdGhzLnNyYy1tZXRhLCBwYXRocy5zcmMtbGliXSwgcGF0aHMuZGVzdC1saWIpXG5cbiAgZ3VscC50YXNrXG4gICAgdGVzdC10YXNrLW5hbWVcbiAgICBbYnVpbGQtdGFzay1uYW1lXVxuICAgICMtPiB0ZXN0V2l0aFJlcG9ydGVyICdzcGVjJ1xuXG4gIGd1bHAudGFza1xuICAgICd0ZXN0LXh1bml0J1xuICAgIFtidWlsZC10YXNrLW5hbWVdXG4gICAgIy0+IHRlc3RXaXRoUmVwb3J0ZXIgJ3h1bml0LWZpbGUnXG5cbiAgZ3VscC50YXNrXG4gICAgJ2F1dG90ZXN0J1xuICAgIFtidWlsZC10YXNrLW5hbWVdXG4gICAgIy0+XG4gICAgICBpZ25vcmUtZXJyb3JzID0gdHJ1ZVxuICAgICAgZ3VscC53YXRjaFxuICAgICAgICBbcGF0aHMuc3JjLW1ldGEsIHBhdGhzLmpzLW1ldGEsIHBhdGhzLnNyYy1saWIsIHBhdGhzLnNyYy10ZXN0XVxuICAgICAgICBbdGVzdC10YXNrLW5hbWVdXG5cbiAgZ3VscC50YXNrKCdkZWZhdWx0JywgZGVmYXVsdC10YXNrcyk7XG5cbiJdfQ==