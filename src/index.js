import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';


Notiflix.Loading.standard('Loading data, please wait...');

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

select.addEventListener('change', onSelect);

function onSelect(evt) {
    const selectedBreedId = evt.currentTarget.value;
    Notiflix.Loading.standard('Loading data, please wait...');

    fetchCatByBreed(selectedBreedId)
        .then(breed => {
            createMarkupCard(breed[0]);
            Notiflix.Loading.remove();
        })
        .catch(() => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(
                'Oops! Something went wrong! Try reloading the page!'
            );
        });
}
fetchBreeds()
    .then(breeds => {
        const markupSelect = breeds
            .map(breed => {
                return `<option value="${breed.id}">${breed.name}</option>`;
            })
            .join();

        select.innerHTML = markupSelect;

        select.style.visibility = 'inherit';
        new SlimSelect({
            select: '.breed-select',
        });
        Notiflix.Loading.remove();
    })
    .catch(() => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
        );
    });



function createMarkupCard(breed) {
    const { url, breeds } = breed;
    const { name, description, temperament } = breeds[0];

    const markupSelect = `
  <h1>${name}</h1>
  <p class ="descr">${description}</p>
  <p>${temperament}</p>
  <img src=${url}>`;

    catInfo.innerHTML = markupSelect;
}




