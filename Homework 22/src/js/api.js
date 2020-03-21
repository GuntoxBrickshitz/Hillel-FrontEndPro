const URL = '';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=30';

const API = {
    getPhotos: () => {
        return fetch(PHOTOS_URL)
            .then(response => response.json());
    }
};