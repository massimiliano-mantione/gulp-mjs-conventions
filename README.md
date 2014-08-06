gulp-mjs-conventions
====================

An npm module to create gulp tasks that we conventionally want in a metascript-based project.

The gulpfile should contain the following:

```
var gulp = require('gulp');
require('gulp-mjs-conventions')(gulp);
```

It assumes a source tree with the following directories:

- meta (contains metascript macros, or anyway filed that must be built early and will not be needed at runtime)
- lib (contains metascript code)
- test (contains mocha-based tests, written in metascript)

It will then create the following tasks:

- 'build' to build the source (meta, and then lib)
- 'test' to run tests
- 'test-xunit' to run tests with the xunit reporter
- 'autotest' to watch any source and run tests on file save
