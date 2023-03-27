import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countriesList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),

};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

   const searchQuery = e.target.value.trim();
   if (searchQuery) {
      fetchCountries(searchQuery)
    .then((result) => 
    {
        if (result.length >10) {
            clearInfo();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } 
        if (2<= result.length && result.length <=10) {
             refs.countryInfo.innerHTML ='';
             renderCountries(result);

        }
        if (result.length === 1) {
             refs.countriesList.innerHTML ='';
             renderCountry(result);
        }
          
    } 
    )
    .catch(error=> console.log(error))

   } else {
    clearInfo();
   }
   
}

function renderCountries(countries) {
    
    const markup = countries.map(({ flags, name })=> {
          return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width="50" height="40">
                <p class="country-list__name">${name.official}</p>
            </li>
      
      `;
    }).join('');
     refs.countriesList.innerHTML = markup;

}

function renderCountry(country) {
    // console.log(country);
    
    const markup = country.map(({ flags, name, capital, population, languages })=> {
        const languagesList = parseLanguages(languages);
        return `
            <div class="country-info__about">
                <img class="country-info__flag" src="${flags.svg}" alt="${name.official}" width="50" height="40">
                <p class="country-info__name">${name.official}</p>
            </div>
            <p class="country-info__capital"><span class="country-info__text">Capital: </span>${capital}</p>
            <p class="country-info__population"><span class="country-info__text">Population: </span>${population}</p>
            <p class="country-info__languages"><span class="country-info__text">Languages: </span>${languagesList}</p>
            `;
    })
     refs.countryInfo.innerHTML = markup;
}

function parseLanguages(languages) {
    return Object.values(languages).join(', ')
}

function clearInfo() {
    refs.countriesList.innerHTML ='';
    refs.countryInfo.innerHTML =''; 
}




