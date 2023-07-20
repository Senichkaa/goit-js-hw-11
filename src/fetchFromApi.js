const axios = require('axios/dist/browser/axios.cjs');
const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '38364804-bc717e421fc678381fef6bf71';

export async function fetchFromApi(query, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: '38364804-bc717e421fc678381fef6bf71',
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
