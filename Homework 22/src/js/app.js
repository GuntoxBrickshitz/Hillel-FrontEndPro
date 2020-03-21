$(() => {
    const photoTemplate = $('#photoTemplate').html();
    const $gallery = $('#gallery');

    API
        .getPhotos()
        .then(setGallery);

    function setGallery(photos) {
        renderPhotos(photos);
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
});