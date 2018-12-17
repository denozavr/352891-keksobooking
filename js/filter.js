'use strict';
(function () {
  var FILTER_INITIAL = 'any';
  var filtersElement = document.querySelector('.map__filters');
  var filterTypeInput = filtersElement.querySelector('#housing-type');
  var filterPriceInput = filtersElement.querySelector('#housing-price');
  var filterRoomInput = filtersElement.querySelector('#housing-rooms');
  var filterGuestInput = filtersElement.querySelector('#housing-guests');

  var Price = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var filterType = function (pin) {
    return filterTypeInput.value === FILTER_INITIAL ? true :
      pin.offer.type === filterTypeInput.value;
  };

  var filterPrice = function (pin) {
    switch (filterPriceInput.value) {
      case 'low':
        return pin.offer.price < Price.LOW;
      case 'middle':
        return pin.offer.price >= Price.LOW && pin.offer.price <= Price.MIDDLE;
      case 'high':
        return pin.offer.price > Price.MIDDLE;
      default:
        return true;
    }
  };

  var filterRoom = function (pin) {
    return filterRoomInput.value === FILTER_INITIAL ? true :
      pin.offer.rooms === parseInt(filterRoomInput.value, 10);
  };

  var filterGuest = function (pin) {
    return filterGuestInput.value === FILTER_INITIAL ? true :
      pin.offer.guests === parseInt(filterGuestInput.value, 10);
  };

  var filterFeature = function (pin) {
    var features = Array.from(filtersElement.querySelectorAll('.map__checkbox:checked'));
    return features.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  var getFiltered = function (items) {
    return items.filter(function (item) {
      return filterType(item) && filterPrice(item) && filterRoom(item) &&
        filterGuest(item) && filterFeature(item);
    });
  };

  window.filter = {
    getFiltered: getFiltered
  };
})();
