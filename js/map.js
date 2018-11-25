'use strict';

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var facilities = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var offers = [];
for (var i = 1; i <= 8; i++) {
  offers.push({
    author: {
      avatar: 'img/avatars/user0' + i + '.png'
    },
    offer: {
      title: titles[i],
      address: '',
      price: getRandomNumber(1000, 1000000),
      type: types[getRandomNumber(0, 3)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 7),
      checkin: checkins[getRandomNumber(0, 2)],
      checkout: checkouts[getRandomNumber(0, 2)],
      features: facilities.slice(0, getRandomNumber(0, 5)),
      description: '',
      photos: photos
    },
    location: {
      x: getRandomNumber(130, 1080),
      y: getRandomNumber(130, 630)
    }
  });
}
