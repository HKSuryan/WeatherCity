import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city) => {
  const currentWeather = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });

  const forecast = await axios.get(`${BASE_URL}/forecast/daily`, {
    params: {
      q: city,
      cnt: 7,
      units: 'metric',
      appid: API_KEY,
    },
  });

  return { currentWeather: currentWeather.data, forecast: forecast.data };
};
