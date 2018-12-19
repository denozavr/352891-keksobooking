'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var formElement = document.querySelector('.ad-form');

  var formHeaderElement = formElement.querySelector('.ad-form-header__upload');
  var avatarUploadInput = formHeaderElement.querySelector('#avatar');
  var headerPreviewImage = formHeaderElement.querySelector('img');

  var photoElement = formElement.querySelector('.ad-form__photo-container');
  var imagesUploadInput = photoElement.querySelector('#images');
  var formImage = photoElement.querySelectorAll('.ad-form__photo');

  imagesUploadInput.multiple = true;

  var checkExtension = function (fileName) {
    var extension = fileName.split('.').pop();
    return FILE_TYPES.indexOf(extension) > -1; // check if extension exists in our array
  };

  var showAvatar = function (evt) {
    headerPreviewImage.src = evt.currentTarget.result;
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
    var file = avatarUploadInput.files[0];
    renderImages(file, showAvatar);
  };

  var onImagesLoad = function () {
    var files = Array.from(imagesUploadInput.files);
    // hide gray preview to restore it on reset
    formImage[0].classList.add('visually-hidden');

    files.forEach(function (file) {
      renderImages(file, showImages);
    });
  };

  var createPreview = function (file) {
    var previewContainer = document.createElement('div');
    var previewImage = new Image(Preview.WIDTH, Preview.HEIGHT);

    previewImage.src = file;
    previewContainer.classList.add('ad-form__photo');
    previewContainer.draggable = true;

    previewContainer.appendChild(previewImage);
    return previewContainer;
  };

  var showImages = function (evt) {
    var file = evt.currentTarget.result;
    var card = createPreview(file);

    card.id = 'preview-' + evt.loaded;
    card.addEventListener('dragstart', onDragStart);

    photoElement.appendChild(card);
  };

  var onDragStart = function (evt) {
    evt.dataTransfer.setData('id', evt.currentTarget.id);

    photoElement.addEventListener('dragover', onDragOver);
    photoElement.addEventListener('drop', onDrop);
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDrop = function (evt) {
    evt.preventDefault();

    var dragged = evt.dataTransfer.getData('id', evt.currentTarget.id);
    photoElement.appendChild(document.querySelector('#' + dragged));
    photoElement.removeEventListener('dragover', onDragOver);

    evt.currentTarget.removeEventListener('drop', onDrop);
  };


  var enableUpload = function () {
    avatarUploadInput.addEventListener('change', onAvatarLoad);
    imagesUploadInput.addEventListener('change', onImagesLoad);
  };

  var resetUpload = function () {
    headerPreviewImage.src = 'img/muffin-grey.svg';
    avatarUploadInput.removeEventListener('change', onAvatarLoad);
    imagesUploadInput.removeEventListener('change', onImagesLoad);

    var resetImages = photoElement.querySelectorAll('.ad-form__photo:not(.visually-hidden)');
    var cards = Array.from(resetImages);
    // restore initial gray preview tile
    formImage[0].classList.remove('visually-hidden');

    cards.forEach(function (card) {
      card.addEventListener('dragstart', onDragStart);
      card.remove();
    });
  };

  window.photoUpload = {
    enableUpload: enableUpload,
    resetUpload: resetUpload
  };
})();
