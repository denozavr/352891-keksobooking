'use strict';

(function () {
  var MAX_PINS = 5;

  var mapPinsElement = document.querySelector('.map__pins:not(.map__pin--main)'); // not to not show card for mainPin(will show error in console)
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();
  var adverts = [];
  var allPins = [];

  var addPins = function (elements) {
    // if 1st call without filtering, then populate allPins array and don't touch it for the next filtered calls
    if (allPins.length === 0) {
      allPins = elements;
    }
    elements = elements.slice(0, MAX_PINS);

    for (var i = 0; i < elements.length; i++) {
      adverts = elements;

      if (!window.utils.checkIsObjectEmpty(adverts[i], 'offer')) {
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
    }

    mapPinsElement.appendChild(fragment);
  };

  // var showError = function (error) {
  //   return error;
  // };

  var createPins = function (filteredPins) {

    if (filteredPins) {
      addPins(filteredPins);
    } else {
      window.backend.loadData(addPins, window.modal.showErrorMessage);
    }
  };

  var deletePins = function () {
    // hide all pins, except MainPin
    var items = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    items.forEach(function (item) {
      item.remove();
    });
  };

  var getAllPins = function () {
    return allPins;
  };

  // click on pin and show Card(advert) popup
  mapPinsElement.addEventListener('click', function (evt) {
    window.card.showCard(evt, adverts);
  });

  window.pin = {
    createPins: createPins,
    deletePins: deletePins,
    getAllPins: getAllPins
  };
})();
