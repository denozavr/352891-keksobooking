'use strict';

(function () {

  var mapElement = document.querySelector('section.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();

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
    // sort photos randomly
    array = window.utils.sortRandomly(array);
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
    cardElement.querySelector('.popup__type').textContent = window.utils.ApartType[offer.type].TITLE; // offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.description;

    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeatures(offer.features));
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(createPhotos(offer.photos));

    mapElement.appendChild(cardElement);
  };

  // close Card(advert) popup on cross click and ESC button
  cardElement.querySelector('.popup__close').addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });


  var showCard = function (evt, adverts) {
    var index = evt.target.dataset.advertId;
    var parentElement = evt.target.parentElement;
    if (evt.target.tagName === 'BUTTON') {
      createCard(adverts[index]);
      cardElement.classList.remove('hidden');
    } else if (evt.target.tagName === 'IMG' && parentElement.className === 'map__pin') {
      index = parentElement.dataset.advertId;
      createCard(adverts[index]);
      cardElement.classList.remove('hidden');
    }
  };

  var hideCard = function () {
    var card = document.querySelector('.map__card.popup');

    if (card) {
      card.remove();
    }
    // cardElement.classList.add('hidden');
  };

  mapElement.addEventListener('keydown', function (evt) {
    window.utils.checkEscape(evt, hideCard);
  });

  window.card = {
    showCard: showCard,
    hideCard: hideCard
  };
})();
