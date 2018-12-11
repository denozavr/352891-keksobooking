'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

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

  var utilsCall = window.utils;

  var adverts = [];
  var createAdvertsList = function () {
    for (var i = 0; i < 8; i++) {
      adverts.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLES[i],
          address: utilsCall.getRandomNumber(utilsCall.Location.MIN_X, utilsCall.Location.MAX_X - PinSize.WIDTH) + ', ' + utilsCall.getRandomNumber(utilsCall.Location.MIN_Y, utilsCall.Location.MAX_Y),
          price: utilsCall.getRandomNumber(Price.MIN, Price.MAX),
          type: utilsCall.getRandomObjectRecord(utilsCall.ApartType).TITLE,
          rooms: utilsCall.getRandomNumber(RoomCount.MIN, RoomCount.MAX),
          guests: utilsCall.getRandomNumber(GuestCount.MIN, GuestCount.MAX),
          checkin: CHECKINS[utilsCall.getRandomNumber(0, CHECKINS.length - 1)],
          checkout: CHECKOUTS[utilsCall.getRandomNumber(0, CHECKOUTS.length - 1)],
          features: FEATURES.slice(0, utilsCall.getRandomNumber(1, FEATURES.length)), // slice doesn't use end index so [last array index + 1]
          description: '',
          photos: PHOTOS // if call sortRandomly from utils.js same order for all 8 cards
        },
        location: {
          x: utilsCall.getRandomNumber(utilsCall.Location.MIN_X, utilsCall.Location.MAX_X - PinSize.WIDTH),
          y: utilsCall.getRandomNumber(utilsCall.Location.MIN_Y, utilsCall.Location.MAX_Y)
        }
      });
    }
  };
  createAdvertsList();

  var getAdvertsData = adverts;

  window.data = {
    getAdvertsData: getAdvertsData
  };
})();
