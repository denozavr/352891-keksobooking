'use strict';

(function () {

  var Keys = {
    ESC: 27
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

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomObjectRecord: getRandomObjectRecord,
    sortRandomly: sortRandomly,
    ApartType: ApartType,
    Location: Location,
    checkEscape: checkEscape
  };
})();
