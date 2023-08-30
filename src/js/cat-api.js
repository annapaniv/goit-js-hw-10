import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_psJManXTLa3EjJuSKzh8yUXsNNIkbKRhK3xM4Zj5S8BkpXYi4xUZLO1AwlYUKB6N';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`/breeds`)
    .then(responce => responce.data);
}

export function fetchCatByBreed(breedId) {

    return axios.get(`/images/search?breed_ids=${breedId}`)
    .then(responce => responce.data)
};
