const GET_DATA_API = 'https://api.covid19tracking.narrativa.com/api/';

const fetchDataApi = async (endPoint) => {
  const data = await fetch(`${GET_DATA_API}${endPoint}`);
  const dataResult = await data.json();
  return dataResult;
};

export default fetchDataApi;
