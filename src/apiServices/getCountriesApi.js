import fetchDataApi from './connApi';

const COUNTRIES_END_POINT = 'countries';

const fetchCountries = () => fetchDataApi(COUNTRIES_END_POINT);

export default fetchCountries;
