import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
    const searchParams = new URLSearchParams(
        {fields: 'name,capital,population,flags,languages', }
    );
    
    const url =`${BASE_URL}/name/${name}?${searchParams}`;
    return fetch(url)
    .then(response=> {
        if (!response.ok) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            throw new Error(response.status);
        };
        return response.json();
    });

};