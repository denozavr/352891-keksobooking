'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var formElement = document.querySelector('.ad-form');

  var formHeaderElement = formElement.querySelector('.ad-form-header__upload');
  var avatarUploadInputElement = formHeaderElement.querySelector('#avatar');
  var headerPreviewImageElement = formHeaderElement.querySelector('img');

  var photoContainerElement = formElement.querySelector('.ad-form__photo-container');
  var imagesUploadInputElement = photoContainerElement.querySelector('#images');
  var formImageElements = photoContainerElement.querySelectorAll('.ad-form__photo');

  imagesUploadInputElement.multiple = true;

  var checkExtension = function (fileName) {
    var extension = fileName.split('.').pop();
    return FILE_TYPES.indexOf(extension) > -1; // check if extension exists in our array
  };

  var showAvatar = function (evt) {
    headerPreviewImageElement.src = evt.currentTarget.result;
  };

  var renderImages = function (file, callback) {
    var fileName = file.name.toLowerCase();

    if (checkExtension(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', callback);
      reader.readAsDataURL(file);
    }
  };

  var onAvatarLoad = function () {
    var file = avatarUploadInputElement.files[0];
    renderImages(file, showAvatar);
  };

  var onImagesLoad = function () {
    var files = Array.from(imagesUploadInputElement.files);
    // hide gray preview to restore it on reset
    formImageElements[0].classList.add('visually-hidden');

    files.forEach(function (file) {
      renderImages(file, showImages);
    });
  };

  var createPreview = function (file) {
    var previewContainerElement = document.createElement('div');
    var previewImage = new Image(Preview.WIDTH, Preview.HEIGHT);

    previewImage.src = file;
    previewContainerElement.classList.add('ad-form__photo');
    previewContainerElement.draggable = true;

    previewContainerElement.appendChild(previewImage);
    return previewContainerElement;
  };

  var showImages = function (evt) {
    var file = evt.currentTarget.result;
    var cardElement = createPreview(file);

    cardElement.id = 'preview-' + evt.loaded;
    cardElement.addEventListener('dragstart', onDragStart);

    photoContainerElement.appendChild(cardElement);
  };

  var onDragStart = function (evt) {
    evt.dataTransfer.setData('id', evt.currentTarget.id);

    photoContainerElement.addEventListener('dragover', onDragOver);
    photoContainerElement.addEventListener('drop', onDrop);
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDrop = function (evt) {
    evt.preventDefault();

    var dragged = evt.dataTransfer.getData('id', evt.currentTarget.id);
    photoContainerElement.appendChild(document.querySelector('#' + dragged));
    photoContainerElement.removeEventListener('dragover', onDragOver);

    evt.currentTarget.removeEventListener('drop', onDrop);
  };


  var enableUpload = function () {
    avatarUploadInputElement.addEventListener('change', onAvatarLoad);
    imagesUploadInputElement.addEventListener('change', onImagesLoad);
  };

  var resetUpload = function () {
    headerPreviewImageElement.src = 'img/muffin-grey.svg';
    avatarUploadInputElement.removeEventListener('change', onAvatarLoad);
    imagesUploadInputElement.removeEventListener('change', onImagesLoad);

    var resetImageElements = photoContainerElement.querySelectorAll('.ad-form__photo:not(.visually-hidden)');
    var cards = Array.from(resetImageElements);
    // restore initial gray preview tile
    formImageElements[0].classList.remove('visually-hidden');

    cards.forEach(function (card) {
      card.removeEventListener('dragstart', onDragStart);
      card.remove();
    });
  };

  window.photoUpload = {
    enableUpload: enableUpload,
    resetUpload: resetUpload
  };
})();
