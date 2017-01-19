var path = require('path');
var through = require('through2');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var gutil = require('gulp-util');

var handleError = function (response) {
  if (response.statusCode !== 200) {
    var message = "kintone responded with a non-200 status code, got " + response.statusCode;
    if (response.body.message) {
      message += " " + response.body.message;
    }
    throw new Error(message);
  }
};

var startDeploy = function (authToken, url, appIds) {
  return request({
    method: 'POST',
    url: url,
    headers: {
      'X-Cybozu-Authorization': authToken
    },
    json: true,
    body: {"apps": appIds}
  })
    .then(function (response) {
      handleError(response);
      gutil.log('Deployed', JSON.stringify(appIds));
    });
};

module.exports = function (opts) {
  opts = opts || {};

  var domain = opts.domain;
  if (!domain.match('\\.')) {
    domain += '.cybozu.com';
  }

  var host = 'https://' + domain;
  var start_deploy_url = host + '/k/' + 'v1/preview/app/deploy.json';

  var allfiles = [];
  return through.obj(function (file, enc, cb) {
    allfiles.push(file);
    cb();
  }, function (cb) {
    var that = this;
    Promise
      .bind({
        appId: opts.appId,
        authToken: opts.authToken
      })
      .then(function () {
        gutil.log('host', host);
        var appIds = [];
        if (Array.isArray(this.appId)) {
          this.appId.forEach(function (id) {
            appIds.push({"app": id});
          });
        } else {
          appIds.push({"app": this.appId});
        }
        return startDeploy(this.authToken, start_deploy_url, appIds);
      })
      .then(function () {
        allfiles.forEach(function (file) {
          that.push(file);
        });
      })
      .asCallback(cb);
  });
};
