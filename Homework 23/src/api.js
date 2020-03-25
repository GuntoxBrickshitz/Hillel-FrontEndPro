export const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=30';

export default {
    getPhotos: () => {
        return fetch(PHOTOS_URL)
            .then(response => response.json());
    }
};