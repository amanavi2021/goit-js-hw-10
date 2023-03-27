import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countriesLiss: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),

};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

   const searchQuery = e.target.value.trim();
   if (searchQuery) {
    // console.log(searchQuery);
    fetchCountries(searchQuery)
    .then((result) => 
    {
        if (result.length >10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } 
        if (2<= result.length <=10) {

        }
        if (result.length === 1) {
            renderCountry(result);
        }
    
        console.log(result.length);
    }
    )
    .catch(error=> console.log(error))

   }
   
}

function renderCountries(country) {

}

function renderCountry(country) {
    console.log(country);
    // const markup = countryCardTpl(country);
    const markup = country.map(({ flags, name, capital, population, languages })=> {
        return `
      <div class="country-info__about">
        <img class="country-info__flag" src="${flags.svg}" alt="${name.official}" width="50" height="40">
        <p class="country-info__name">${name.official}</p>
      </div>
      <p class="country-info__text">Capital: <span class="country-info__capital-value">${capital}</span> </p>
      <p class="country-info__text">Population: <span  class="country-info__population-value">${population}</span> </p>
      <p class="country-info__text">Languages: <span  class="country-info__languages-value">${languages}</span> </p>
      `;
    })
     refs.countryInfo.innerHTML = markup;
}






