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
    module.exports = function (gulp) {
        var paths, ignoreErrors, onError, combine, where, isJavascriptFile, javascriptFiles, compile, testWithReporter, _$3, _$4, _$5;
        _$4: {
            _$5: {
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
                    var _$6, _$7, _$8;
                    _$7: {
                        gutil.log(err.stack || gutil.colors.red(err.message) || err);
                        if (ignoreErrors) {
                            _$8 = this.emit('end');
                        } else {
                            _$8 = process.exit(1);
                        }
                        _$6 = _$8;
                        break _$7;
                    }
                    return _$6;
                };
                combine = function () {
                    return es.pipeline.apply(null, arguments);
                };
                where = function (predicate) {
                    return es.map(function (data, callback) {
                        var _$6;
                        if (predicate(data)) {
                            _$6 = callback(null, data);
                        } else {
                            _$6 = callback();
                        }
                        return _$6;
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
                var _$6, _$7;
                _$7: {
                    console.log(' *** build-meta');
                    _$6 = compile(paths.srcMeta, paths.destMeta);
                    break _$7;
                }
                return _$6;
            });
            gulp.task('build', function () {
                return compile([
                    paths.srcMeta,
                    paths.srcLib
                ], paths.destLib);
            });
            gulp.task('test', ['build'], function () {
                return testWithReporter('spec');
            });
            gulp.task('test-xunit', ['build'], function () {
                return testWithReporter('xunit-file');
            });
            gulp.task('autotest', ['build'], function () {
                var _$6, _$7;
                _$7: {
                    ignoreErrors = true;
                    _$6 = gulp.watch([
                        paths.srcMeta,
                        paths.jsMeta,
                        paths.srcLib,
                        paths.srcTest
                    ], ['test']);
                    break _$7;
                }
                return _$6;
            });
            gulp.task('default', ['test']);
            _$3 = undefined;
            break _$4;
        }
        return _$3;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tYWluLm1qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiaW5zdGFsbCIsImd1bHAiLCJndXRpbCIsIm1qcyIsIm1vY2hhIiwiZXMiLCJwYXRoIiwibW9kdWxlIiwiZXhwb3J0cyIsInBhdGhzIiwiaWdub3JlRXJyb3JzIiwiZmFsc2UiLCJvbkVycm9yIiwiZXJyIiwibG9nIiwic3RhY2siLCJjb2xvcnMiLCJyZWQiLCJtZXNzYWdlIiwiXyQ4IiwiZW1pdCIsInByb2Nlc3MiLCJleGl0IiwiXyQ2IiwiY29tYmluZSIsInBpcGVsaW5lIiwiYXBwbHkiLCJudWxsIiwiYXJndW1lbnRzIiwid2hlcmUiLCJwcmVkaWNhdGUiLCJtYXAiLCJkYXRhIiwiY2FsbGJhY2siLCJpc0phdmFzY3JpcHRGaWxlIiwiZiIsImV4dG5hbWUiLCJqYXZhc2NyaXB0RmlsZXMiLCJjb21waWxlIiwic3JjIiwiZGVzdCIsInRydWUiLCJvbiIsInRlc3RXaXRoUmVwb3J0ZXIiLCJyZXBvcnRlciIsInNyY1Rlc3QiLCJkZXN0VGVzdCIsInRhc2siLCJjb25zb2xlIiwic3JjTWV0YSIsImRlc3RNZXRhIiwic3JjTGliIiwiZGVzdExpYiIsIndhdGNoIiwianNNZXRhIiwiXyQzIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiQUFBQSxJLElBQUEsRSxLQUFBLEUsR0FBQSxFLEtBQUEsRSxFQUFBLEUsSUFBQSxFLEdBQUEsRSxHQUFBLEUsR0FBQSxDO0FBQUE7QUFBQSxJQUFBQSxPQUFPLHNCQUFzQixDQUFDQyxPQUFPLEdBQXJDO0FBQUEsSUFDQTtBQUFBLEtBREE7QUFBQSxJQU1BO0FBQUEsUUFDRUMsSUFBSyxHQUFFRixPQUFRLFFBQVYsQ0FEUDtBQUFBLFFBRUVHLEtBQU0sR0FBRUgsT0FBUSxhQUFWLENBRlI7QUFBQSxRQUdFSSxHQUFJLEdBQUVKLE9BQVEsWUFBVixDQUhOO0FBQUEsUUFJRUssS0FBTSxHQUFFTCxPQUFRLGNBQVYsQ0FKUjtBQUFBLFFBS0VNLEVBQUcsR0FBRU4s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LElBQUksQ0FBQ29ELEtBQUs7QUFBQSx3QkFBRTVDLEtBQUssQ0FBQ3dDLE9BQVI7QUFBQSx3QkFBa0J4QyxLQUFLLENBQUM2QyxNQUF4QjtBQUFBLHdCQUFpQzdDLEtBQUssQ0FBQzBDLE1BQXZDO0FBQUEsd0JBQWdEMUMsS0FBSyxDQUFDb0MsT0FBdEQ7QUFBQSx1QkFBK0QsQ0FBRSxNQUFGLENBQS9ELEVBRFY7QUFBQTtBQUFBLGlCQURGO0FBQUEsdUJBQ0V0QixHQURGO0FBQUEsYUFGQSxFQWxFcUI7QUFBQSxZQXdFdkJ0QixJQUFJLENBQUM4QyxJQUFJLFlBQVUsQ0FBRSxNQUFGLENBQVYsRUF4RWM7QUFBQSxZQUFBUSxHQUFBLEdBQUFDLFNBQUE7QUFBQTtBQUFBLFNBQUg7QUFBQSxlQUFHRCxHQUFIO0FBQUEsS0FBUCxDQWZmO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcbiNleHRlcm5hbFxuICBhcmd1bWVudHNcbiAgbW9kdWxlXG4gIHByb2Nlc3NcblxudmFyXG4gIGd1bHAgPSByZXF1aXJlICdndWxwJ1xuICBndXRpbCA9IHJlcXVpcmUgJ2d1bHAtdXRpbCdcbiAgbWpzID0gcmVxdWlyZSAnZ3VscC1tanMnXG4gIG1vY2hhID0gcmVxdWlyZSAnZ3VscC1tb2NoYSdcbiAgZXMgPSByZXF1aXJlICdldmVudC1zdHJlYW0nXG4gIHBhdGggPSByZXF1aXJlICdwYXRoJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZ3VscCAtPiBkbyFcblxuICB2YXJcbiAgICBwYXRocyA9IHtcbiAgICAgIHNyYy1tZXRhOiAnbWV0YS8qKi8qLm1qcydcbiAgICAgIHNyYy1saWI6ICdsaWIvKiovKi5tanMnXG4gICAgICBzcmMtdGVzdDogJ3Rlc3QvKiovKi5tanMnXG4gICAgICBkZXN0LW1ldGE6ICdtZXRhJ1xuICAgICAgZGVzdC1saWI6ICdsaWInXG4gICAgICBkZXN0LXRlc3Q6ICd0ZXN0J1xuICAgIH1cblxuICAgIGlnbm9yZS1lcnJvcnMgPSBmYWxzZVxuXG4gICAgb24tZXJyb3IgPSBlcnIgLT5cbiAgICAgIGd1dGlsLmxvZyhlcnIuc3RhY2sgfHwgKGd1dGlsLmNvbG9ycy5yZWQoZXJyLm1lc3NhZ2UpKSB8fCBlcnIpXG4gICAgICBpZiAoaWdub3JlLWVycm9ycylcbiAgICAgICAgdGhpcy5lbWl0KCdlbmQnKVxuICAgICAgZWxzZVxuICAgICAgICBwcm9jZXNzLmV4aXQgMVxuXG4gICAgY29tYmluZSA9ICMtPiBlcy5waXBlbGluZS5hcHBseShudWxsLCBhcmd1bWVudHMpXG5cbiAgICB3aGVyZSA9IHByZWRpY2F0ZSAtPlxuICAgICAgZXMubWFwXG4gICAgICAgIChkYXRhLCBjYWxsYmFjaykgLT5cbiAgICAgICAgICBpZiAocHJlZGljYXRlKGRhdGEpKVxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSlcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYWxsYmFjaygpXG5cbiAgICBqYXZhc2NyaXB0LWZpbGU/ID0gZiAtPiBmLnBhdGggJiYgKHBhdGguZXh0bmFtZSAoZi5wYXRoKSkgPT0gJy5qcydcbiAgICBqYXZhc2NyaXB0RmlsZXMgPSAjLT4gd2hlcmUgamF2YXNjcmlwdC1maWxlP1xuXG4gICAgY29tcGlsZSA9IChzcmMsIGRlc3QpIC0+IGNvbWJpbmVcbiAgICAgIGd1bHAuc3JjIHNyY1xuICAgICAgKG1qcyB7ZGVidWc6IHRydWV9KS5vbignZXJyb3InLCBvbi1lcnJvcilcbiAgICAgIGd1bHAuZGVzdCBkZXN0XG5cbiAgICB0ZXN0LXdpdGgtcmVwb3J0ZXIgPSByZXBvcnRlciAtPiBjb21iaW5lXG4gICAgICBjb21waWxlKHBhdGhzLnNyYy10ZXN0LCBwYXRocy5kZXN0LXRlc3QpXG4gICAgICBqYXZhc2NyaXB0RmlsZXMoKVxuICAgICAgKG1vY2hhIHtyZXBvcnRlcjogcmVwb3J0ZXJ9KS5vbignZXJyb3InLCBvbi1lcnJvcilcblxuICBndWxwLnRhc2tcbiAgICAnYnVpbGQtbWV0YSdcbiAgICAjLT5cbiAgICAgIGNvbnNvbGUubG9nIFwiICoqKiBidWlsZC1tZXRhXCJcbiAgICAgIGNvbXBpbGUocGF0aHMuc3JjLW1ldGEsIHBhdGhzLmRlc3QtbWV0YSlcblxuICBndWxwLnRhc2tcbiAgICAnYnVpbGQnXG4gICAgO1snYnVpbGQtbWV0YSddXG4gICAgIy0+IGNvbXBpbGUoW3BhdGhzLnNyYy1tZXRhLCBwYXRocy5zcmMtbGliXSwgcGF0aHMuZGVzdC1saWIpXG5cbiAgZ3VscC50YXNrXG4gICAgJ3Rlc3QnXG4gICAgWydidWlsZCddXG4gICAgIy0+IHRlc3RXaXRoUmVwb3J0ZXIgJ3NwZWMnXG5cbiAgZ3VscC50YXNrXG4gICAgJ3Rlc3QteHVuaXQnXG4gICAgWydidWlsZCddXG4gICAgIy0+IHRlc3RXaXRoUmVwb3J0ZXIgJ3h1bml0LWZpbGUnXG5cbiAgZ3VscC50YXNrXG4gICAgJ2F1dG90ZXN0J1xuICAgIFsnYnVpbGQnXVxuICAgICMtPlxuICAgICAgaWdub3JlLWVycm9ycyA9IHRydWVcbiAgICAgIGd1bHAud2F0Y2goW3BhdGhzLnNyYy1tZXRhLCBwYXRocy5qcy1tZXRhLCBwYXRocy5zcmMtbGliLCBwYXRocy5zcmMtdGVzdF0sIFsndGVzdCddKVxuXG4gIGd1bHAudGFzaygnZGVmYXVsdCcsIFsndGVzdCddKTtcblxuIl19