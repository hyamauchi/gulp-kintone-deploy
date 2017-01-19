# gulp-kintone-deploy

A gulp plugin that helps you 
A gulp plugin to deploy settings on kintone App.
## Usage

```
npm install gulp-kintone-deploy --save
```

```
var kintone = require('gulp-kintone-deploy');

gulp.task('deploy', function () {
  return gulp.src([])
    .pipe(kintone({
      'domain': CYBOZU_DOMAIN,
      'appId': kintone_TARGET_APP_ID,
      'authToken': new Buffer('Administrator:password').toString('base64')
    }))
});
```
```
gulp.task('multideploy', function () {
  return gulp.src([])
    .pipe(kintone({
      'domain': CYBOZU_DOMAIN,
      'appId': [kintone_TARGET_APP_ID, kintone_TARGET_APP_ID, kintone_TARGET_APP_ID],
      'authToken': new Buffer('Administrator:password').toString('base64')
    }))
});
```
```
gulp.task('chain', function () {
  return gulp.src('./src/**/*')
    .pipe(kintone({
      'domain': CYBOZU_DOMAIN,
      'appId': kintone_TARGET_APP_ID,
      'authToken': new Buffer('Administrator:password').toString('base64')
    }))
    .pipe(kintone({
      'domain': CYBOZU_DOMAIN,
      'appId': [kintone_TARGET_APP_ID, kintone_TARGET_APP_ID]
      'authToken': new Buffer('Administrator:password').toString('base64')
    }));
});
```

## License

MIT
