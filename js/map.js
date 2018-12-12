'use strict';

var Keys = {
  ESC: 27
};

var MainPinSize = {
  HEIGHT: 80,
  WIDTH: 62
};

var mapElement = document.querySelector('section.map');
// mapElement.classList.remove('map--faded'); // delete map--faded

var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardElement = mapCardTemplate.cloneNode(true);

var mapPinsElement = mapElement.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();


var createPins = function (array) {
  for (var i = 0; i < array.length; i++) {
    var adverts = window.data.getAdvertsData;

    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = adverts[i].location.x + 'px';
    pinElement.style.top = adverts[i].location.y + 'px';
    pinElement.dataset.advertId = i;
    var pinImageElement = pinElement.querySelector('img');
    pinImageElement.src = adverts[i].author.avatar;
    pinImageElement.alt = adverts[i].offer.title;
    pinImageElement.title = adverts[i].offer.title;

    fragment.appendChild(pinElement);
  }

  mapPinsElement.appendChild(fragment);
};

// createPins(adverts);

var createFeatures = function (array) {
  for (var i = 0; i < array.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + array[i];
    featureItem.title = array[i];
    fragment.appendChild(featureItem);
  }
  return fragment;
};

var createPhotos = function (array) {
  for (var i = 0; i < array.length; i++) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.src = array[i];
    photo.width = '45';
    photo.height = '40';
    photo.alt = 'Фотография жилья';
    photo.title = 'Фотография жилья';
    fragment.appendChild(photo);
  }
  return fragment;
};

var createCard = function (advert) {
  var offer = advert.offer;
  cardElement.querySelector('img').src = advert.author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeatures(offer.features));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createPhotos(offer.photos));

  mapElement.appendChild(cardElement);
};

// createCard(adverts[getRandomNumber(0, adverts.length - 1)]);

var getMainPinCoordinates = function (el) {
  return Math.floor(parseInt(el.style.left, 10) + MainPinSize.WIDTH / 2) + ', ' + Math.floor(parseInt(el.style.top, 10) + MainPinSize.HEIGHT);
};


var pinMainElement = document.querySelector('.map__pin--main');
window.form.setAddress(getMainPinCoordinates(pinMainElement));

// click on mainPin and write input address
var makePageActiveIfFaded = function () {
  if (mapElement.classList.contains('map--faded')) {

    mapElement.classList.remove('map--faded');
    window.form.makeFormActive();

    window.form.disableFormElements(false);

    createPins(window.data.getAdvertsData);
    window.form.initForm();
  }
};

var setMainPinCoordinates = function (x, y) {
  var positionY = pinMainElement.offsetTop - y;
  var positionX = pinMainElement.offsetLeft - x;

  if (positionY < window.utils.Location.MAX_Y && positionY > (window.utils.Location.MIN_Y - MainPinSize.HEIGHT)) {
    pinMainElement.style.top = positionY + 'px';
  }

  if (positionX < (window.utils.Location.MAX_X - MainPinSize.WIDTH) && positionX > window.utils.Location.MIN_X) {
    pinMainElement.style.left = positionX + 'px';
  }

  window.form.setAddress(getMainPinCoordinates(pinMainElement));
};

// move/drag mainPin
// https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
pinMainElement.addEventListener('mousedown', function (evt) {
  var startPosition = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvent) {
    moveEvent.preventDefault();
    var changePosition = {
      x: startPosition.x - moveEvent.clientX,
      y: startPosition.y - moveEvent.clientY
    };

    startPosition = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    setMainPinCoordinates(changePosition.x, changePosition.y);
  };

  var onMouseUp = function (upEvent) {
    upEvent.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    makePageActiveIfFaded();
    window.form.setAddress(getMainPinCoordinates(pinMainElement));
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

// click on pin and show Card(advert) popup
mapPinsElement.addEventListener('click', function (evt) {
  var index = evt.target.dataset.advertId;
  var parentElement = evt.target.parentElement;
  if (evt.target.tagName === 'BUTTON') {
    createCard(window.data.getAdvertsData[index]);
    cardElement.classList.remove('hidden');
  } else if (evt.target.tagName === 'IMG' && parentElement.className === 'map__pin') {
    index = parentElement.dataset.advertId;
    createCard(window.data.getAdvertsData[index]);
    cardElement.classList.remove('hidden');
  }

});

// close Card(advert) popup on cross click and ESC button
cardElement.querySelector('.popup__close').addEventListener('click', function () {
  cardElement.classList.add('hidden');
});

mapElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === Keys.ESC) {
    cardElement.classList.add('hidden');
  }
});
