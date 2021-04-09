import axios from 'axios';

export const apiRootLive = 'https://api.openweathermap.org/data/2.5';

export const client = axios.create({
  baseURL: apiRootLive,
  timeout: 30000,
  headers: {},
  params: {
    appid: "OPEN WEATHER API KEY",
  },
});
// // Add a request interceptor
client.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    if (response.data) return response.data;
    else {
      if (response.data.message) message = response.data.message;
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);
