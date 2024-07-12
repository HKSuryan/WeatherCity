import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import "../../css/currentWeather.css"
const CurrentWeather = ({ weather ,icon}) => {
  return (
   
    <Card className='weath' style={{backgroundImage:`url(${icon})`,backgroundRepeat:'no-repeat',boxShadow:" 0 0 20px #000"}}>
    
      <CardContent >
        <Typography variant="h2">{weather.name}</Typography>
        <Typography variant="h2">{weather.main.temp}°C</Typography>
        <Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1">Wind Speed: {weather.wind.speed} m/s</Typography>
        <Typography variant="body1">{weather.weather[0].description}</Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
