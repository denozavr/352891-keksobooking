'use strict';

(function () {
  var TIMEOUT = 45000; // big timeout to give user opportunity to upload large images via form

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var getStatusCodeCallback = function (xhr, successCallback, errorCallback) {
    switch (xhr.status) {
      case StatusCode.OK:
        successCallback(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        errorCallback('Request error');
        break;
      case StatusCode.UNAUTHORIZED:
        errorCallback('Unauthorized access error');
        break;
      case StatusCode.FORBIDDEN:
        errorCallback('Access forbidden');
        break;
      case StatusCode.NOT_FOUND:
        errorCallback('Not found');
        break;
      case StatusCode.SERVER_ERROR:
        errorCallback('Internal server error');
        break;
      default:
        errorCallback('Response status: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      getStatusCodeCallback(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      onError('Connection error');
    });

    xhr.addEventListener('timeout', function () {
      onError('Request could not be implemented for the ' + xhr.timeout + 'ms');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  var loadData = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    sendData: sendData
  };

})();
