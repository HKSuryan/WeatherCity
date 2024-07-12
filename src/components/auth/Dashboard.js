// src/components/Dashboard.js
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SearchBar from '../weather/SearchBar';
import CurrentWeather from '../weather/currentWeather';
import Forecast from '../weather/Forecast';
import { GetWeather } from '../../services/weatherService';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import "../../css/Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const location = useLocation();

  useMemo(()=>{
    if(weather != null){
     
    switch (weather.weather[0].main) {
    case "Snow":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif"
      );
      break;
    case "Clouds":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif"
      );
      break;
      case "Mist":
        setIcon(
          "https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif"
        );
        break;
    case "Fog":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif"
      );
      break;
    case "Rain":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif"
      );
      break;
    case "Clear":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif"
      );
      break;
    case "Thunderstorm":
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif"
      );
      break;
    default:
      setIcon(
        "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif"
      );
      break;
  }}},[weather]);

  useMemo(() => {
    if(location.state != null){
    setSelectedCity(location.state.selectedCity);}
  }, [location.state]); // Only re-compute when `data` changes


  useEffect(() => {
    const fetchFavorites = async () => {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFavoriteCities(docSnap.data().favoriteCities);
      }
    };

    fetchFavorites();
  }, [currentUser]);
  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeatherData = async () => {
      try {
        const data = await GetWeather(selectedCity);
        setWeather(data.currentWeather);
        setError('');
        setForecast(data.forecast);
        setIcon(data.icon);
      } catch (error) {
    
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleSearch = async (city) => {
    try {
      const data = await GetWeather(city);
      setWeather(data.currentWeather);
      setError('');
      setForecast(data.forecast);
    } catch (error) {
   
      setError('City not found');
    }
  };

  const handleAddFavorite = async (city) => {
    const updatedFavorites = [...favoriteCities, city];
    setFavoriteCities(updatedFavorites);
    await updateDoc(doc(db, 'users', currentUser.uid), {
      favoriteCities: updatedFavorites,
    });
  };

  return (
    <div>
      <div className='barback'>
        <div className='barin'>
      <SearchBar onSearch={handleSearch} /></div></div>
      <Container>
        <div className='weather'>
      {weather && <CurrentWeather weather={weather} icon={icon} />}
      {weather && !favoriteCities.includes(weather.name) && (
          <button className="favs-btn" onClick={() => handleAddFavorite(weather.name)}>ADD TO FAVOURITES</button>
        )}
      </div>
  
      <Forecast forecast={forecast} />
      

      {error && <p>{error}</p>}
      

</Container>
    </div>
  );
};

export default Dashboard;
