import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GetWeather = async (city) => {

  const currentWeather = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  // switch (GetWeather.data.main) {
  //   case "Snow":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')"
  //     );
  //     break;
  //   case "Clouds":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
  //     );
  //     break;
  //   case "Fog":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')"
  //     );
  //     break;
  //   case "Rain":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')"
  //     );
  //     break;
  //   case "Clear":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
  //     );
  //     break;
  //   case "Thunderstorm":
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
  //     );
  //     break;
  //   default:
  //     setIcon(
  //       "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
  //     );
  //     break;
  // }

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${API_KEY}`;
  const geoResponse = await axios.get(url);
  const lat = geoResponse.data[0].lat;

  const lon = geoResponse.data[0].lon;


  const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`,{
    params: {
      lat: lat,
      lon: lon,
      units: 'metric',
      appid: API_KEY,
    },
  });
  

  return { currentWeather: currentWeather.data ,forecast:forecast.data};
};
