import { client } from '../../helper/api';

export const GET_CITY_LIST = 'WEATHER/GET_CITY_LIST';

const initialState = {
  weather_data: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CITY_LIST:
      return {
        ...state,
        weather_data: action.payload,
      };

    default:
      return state;
  }
}

/**
 * Get Weather Data Near By Cities From Current Location
 * @param lat 
 * @param long 
 * @returns 
 */
export const weatherByCities = (lat, long) => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .get('/find', {
        params: {
          lat: lat,
          lon: long,
          cnt: 50,
          units: "metric",
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

/**
 * Get Weather Data Of Current Location
 * @param lat 
 * @param long 
 * @returns 
 */
export const getCurrentTemp = (lat, long) => (dispatch) =>
  new Promise(function (resolve, reject) {
    client
      .get('/weather', {
        params: {
          lat: lat,
          lon: long,
          units: "metric",
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
