'use strict';

(function () {

  // #region Move later to utils.js
  var LocationX = {
    MIN: 0,
    MAX: 1200
  };

  var LocationY = {
    MIN: 130,
    MAX: 630
  };


  var PinSize = {
    HEIGHT: 70,
    WIDTH: 50
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
  // #endregion

  var Price = {
    MIN: 1000,
    MAX: 1000000
  };

  var RoomCount = {
    MIN: 1,
    MAX: 5
  };

  var GuestCount = {
    MIN: 1,
    MAX: 10
  };

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  // var types = ['palace', 'flat', 'house', 'bungalo'];
  // var types = [
  //   {eng: 'palace', rus: 'дворец'},
  //   {eng: 'flat', rus: 'квартира'},
  //   {eng: 'house', rus: 'дом'},
  //   {eng: 'bungalo', rus: 'бунгало'}];
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

  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = CHECKINS;

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
  ];


  var adverts = [];
  var createAdvertsList = function () {
    for (var i = 0; i < 8; i++) {
      adverts.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLES[i],
          address: getRandomNumber(LocationX.MIN, LocationX.MAX - PinSize.WIDTH) + ', ' + getRandomNumber(LocationY.MIN, LocationY.MAX),
          price: getRandomNumber(Price.MIN, Price.MAX),
          type: getRandomObjectRecord(ApartType).TITLE,
          rooms: getRandomNumber(RoomCount.MIN, RoomCount.MAX),
          guests: getRandomNumber(GuestCount.MIN, GuestCount.MAX),
          checkin: CHECKINS[getRandomNumber(0, CHECKINS.length - 1)],
          checkout: CHECKOUTS[getRandomNumber(0, CHECKOUTS.length - 1)],
          features: FEATURES.slice(0, getRandomNumber(1, FEATURES.length)), // slice doesn't use end index so [last array index + 1]
          description: '',
          photos: PHOTOS.sort(randomSort)
        },
        location: {
          x: getRandomNumber(LocationX.MIN, LocationX.MAX - PinSize.WIDTH), // TODO: calculate later via document.querySelector('.map__overlay').offsetWidth/height - pin size
          y: getRandomNumber(LocationY.MIN, LocationY.MAX)
        }
      });
    }
  };
  createAdvertsList();

  var getData = adverts;

  window.data = {
    getData: getData
  };
})();
