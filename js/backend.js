'use strict';

(function () {
  var TIMEOUT = 5555;

  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var sendRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      window.utils.statusCodeCB(xhr, onLoad, onError);
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
    var xhr = new XMLHttpRequest();

    sendRequest(xhr, onLoad, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    sendRequest(xhr, onLoad, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    sendData: sendData
  };

})();
