'use strict';

(function () {
  var MAX_PINS = 5;

  var mapPinsElement = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();
  var adverts = [];
  var allPins = [];

  var addPins = function (elements) {
    if (elements.length > 0) {
      mapPinsElement.addEventListener('click', onClick); // add only if loadData from backend was successfull
    }
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

  var createPins = function (filteredPins) {

    if (filteredPins) {
      addPins(filteredPins);
    } else {
      window.backend.loadData(addPins, window.modal.showErrorMessage);
    }
  };

  var deletePins = function () {
    // hide all pins, except MainPin
    var items = mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    items.forEach(function (item) {
      item.remove();
    });
    mapPinsElement.removeEventListener('click', onClick);
  };

  var getAllPins = function () {
    return allPins;
  };

  var checkAdvertId = function (evt) {
    var advertId = evt.target.dataset.advertId || (evt.target.offsetParent && evt.target.offsetParent.dataset.advertId);
    return parseInt(advertId, 10);
  };

  var onClick = function (evt) {
    // call card.showPopup only for map__pin, but not for mainPin or click on div.map__pins
    if (checkAdvertId(evt) >= 0) {
      window.card.show(evt, adverts);
    }
  };


  window.pin = {
    createPins: createPins,
    deletePins: deletePins,
    getAllPins: getAllPins
  };
})();
