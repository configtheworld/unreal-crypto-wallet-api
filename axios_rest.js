const { default: axios } = require('axios');

const headers = {
  authorization: 'Apikey ' + process.env.CRYPTO_COMPARE_API_KEY,
};

const baseUrl = 'https://min-api.cryptocompare.com';

const axios_get = (url) => {
  return axios.get(`${baseUrl}${url}`, {
    headers: headers,
  });
};

const axios_post = (url, payload) => {
  return axios.post(`${baseUrl}${url}`, payload, {
    headers: headers,
  });
};

module.exports = {
  axios_get,
  axios_post,
};
