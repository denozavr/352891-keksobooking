'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var ESC_CODE = 27;

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

  var randomSort = function () {
    return 0.5 - Math.random();
  };

  var sortRandomly = function (list) {
    var sortedList = list.sort(randomSort);
    return sortedList;
  };

  var checkEscape = function (evt, callback) {
    if (evt.keyCode === ESC_CODE) {
      callback();
    }
  };

  var checkIsObjectEmpty = function (object, propName) {
    return Object.keys(object[propName]).length === 0;
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
    sortRandomly: sortRandomly,
    setDebounce: setDebounce,
    checkEscape: checkEscape,
    checkIsObjectEmpty: checkIsObjectEmpty,
    ApartType: ApartType,
    Location: Location
  };
})();
