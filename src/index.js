import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const list = document.querySelector('.country-list');
const information = document.querySelector('.country-info');
const inputField = document.querySelector('#search-box');


inputField.addEventListener('input', debounce(inputText, DEBOUNCE_DELAY));

function inputText() {
    const nameOfCountry = inputField.value.trim();
    if (nameOfCountry !== '') {
        fetchCountries(nameOfCountry)
            .then(countryChecking)
            .catch(error => {
                console.log(error);
            });
    }   information.innerHTML = '';
        list.innerHTML = '';
}

function countryChecking(countryList) {
    if (countryList.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    } else if (countryList.length >= 2 && countryList.length <= 10) {
        countryListBuilder(countryList)
        return;
    } countryInfoBuilder(countryList); 
}

function countryListBuilder(country) {
    const markup = country.map(
    ({ flags, name }) =>
       `<li style=display:flex>
        <img src = "${flags.svg}" alt = "${name.official}" width=50 style="margin-right: 10px;"/>
        <h2 class = "country-title">${name.official}</h2>
        </li>`
    );
    information.innerHTML = ''
    list.innerHTML = markup.join('')
}

function countryInfoBuilder(country) {
    const markup = country.map(
    ({
      name,
      capital,
      population,
      flags,
      languages,
    }) => 
        `<div style="display:flex;align-items: center;">
        <img src = "${flags.svg}" alt = "${name.official}" width=100  style="margin-right: 10px;"/>
        <h2>${name.official}</h2>
        </div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`
    )
    list.innerHTML = ''
    information.innerHTML = markup.join('')
}
