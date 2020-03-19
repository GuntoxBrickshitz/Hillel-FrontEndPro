$(() => {
    const imageTemplate = $('#imageTemplate').html();
    const $gallery = $('#gallery');

    API.getPhotos().then(setGallery);

    function setGallery(imagesArray) {
        renderImages(imagesArray);

        initGallery();
    }

    function renderImages(images) {
        $gallery.html(images.map(getImageHtml).join('\n'));
    }

    function getImageHtml(image) {
        return imageTemplate
            .replace('{{imageUrl}}', image.url)
            .replace('{{imageThumbnailUrl}}', image.thumbnailUrl)
            .replace('{{imageTitle}}', image.title);
    }

    function initGallery() {
        $gallery.find('a').simpleLightbox({
            fileExt: false
        });
    }
});