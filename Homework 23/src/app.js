import $ from 'jquery';
import API from './api';
// import '../node_modules/jquery-simplegallery/js/jquery.gallery.js';
require('imports-loader?jQuery=jquery!../node_modules/jquery-simplegallery/js/jquery.gallery.js');
import '../node_modules/jquery-simplegallery/css/font-awesome.css';
import '../node_modules/jquery-simplegallery/css/jquery.gallery.css';

$(() => {
    const photoTemplate = $('#photoTemplate').html();
    const $gallery = $('#gallery');

    API
        .getPhotos()
        .then(setGallery);

    function setGallery(photos) {
        renderPhotos(photos);
        createGallery();
    }

    function renderPhotos(photos) {
        $gallery.html(photos.map(getImageHtml).join('\n'));
    }

    function getImageHtml(photo) {
        return photoTemplate
            .replace('{{photoId}}', photo.id)
            .replace('{{photoUrl}}', photo.url)
            .replace('{{photoThumbnailUrl}}', photo.thumbnailUrl)
            .replace('{{photoTitle}}', photo.title);
    }

    function createGallery() {
        $gallery.createSimpleImgGallery();
    }
});