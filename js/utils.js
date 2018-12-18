'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var Keys = {
    ESC: 27
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var Location = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };


  var ApartType = {
    'palace': {
      TITLE: 'Дворец',
      MIN_PRICE: 10000
    },
    'house': {
      TITLE: 'Дом',
      MIN_PRICE: 5000
    },
    'flat': {
      TITLE: 'Квартира',
      MIN_PRICE: 1000
    },
    'bungalo': {
      TITLE: 'Бунгало',
      MIN_PRICE: 0
    }
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomObjectRecord = function (objectsList) {
    var keys = Object.keys(objectsList);
    return objectsList[keys[getRandomNumber(0, keys.length - 1)]];
  };

  var randomSort = function () {
    return 0.5 - Math.random();
  };

  var sortRandomly = function (list) {
    var sortedList = list.sort(randomSort);
    return sortedList;
  };

  var checkEscape = function (evt, callback) {
    if (evt.keyCode === Keys.ESC) {
      callback();
    }
  };

  function checkifObjEmpty(object, propName) {
    return Object.keys(object[propName]).length === 0;
  }

  var statusCodeCB = function (xhr, successCallback, errorCallback) {
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

  var setDebounce = function (callback) {
    var lastTimeout = null;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback();
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomObjectRecord: getRandomObjectRecord,
    sortRandomly: sortRandomly,
    setDebounce: setDebounce,
    checkEscape: checkEscape,
    checkifObjEmpty: checkifObjEmpty,
    ApartType: ApartType,
    Location: Location,
    statusCodeCB: statusCodeCB
  };
})();
