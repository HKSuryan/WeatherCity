import React from 'react';
import { Card, CardContent,  Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "../../css/Forecast.css"

const Forecast = ({ forecast }) => {
  // const [icon, setIcon] = useState(null);
  // useMemo(()=>{
  //   if(weather != null){
  //     console.log(weather.weather[0].main);
  //   switch (weather.weather[0].main) {
  //   case "Snow":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif"
  //     );
  //     break;
  //   case "Clouds":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif"
  //     );
  //     break;
  //     case "Mist":
  //       setIcon(
  //         "https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif"
  //       );
  //       break;
  //   case "Fog":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif"
  //     );
  //     break;
  //   case "Rain":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif"
  //     );
  //     break;
  //   case "Clear":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif"
  //     );
  //     break;
  //   case "Thunderstorm":
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif"
  //     );
  //     break;
  //   default:
  //     setIcon(
  //       "https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif"
  //     );
  //     break;
  // }}},[weather]);

  if(!forecast){
    return null;
  }
  if (!Array.isArray(forecast.list) || forecast.list.length === 0 ) {
    return null; // Ensure forecast is an array
  }
  
  

  // Group data by day
  const dailyData = forecast.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  // Calculate average temperature for each day
  const chartData = {
    labels: Object.keys(dailyData),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: Object.values(dailyData).map(dayData => {
          const totalTemp = dayData.reduce((sum, entry) => sum + entry.main.temp, 0);
          return totalTemp / dayData.length;
        }),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };


  return (
    <Card >
      <CardContent>
      
        <Typography variant="h5">5-Day / 3-Hour Forecast</Typography>
  
        <Line data={chartData} />
        <div className="forc" >
        {Object.entries(dailyData).map(([date, dayData], index) => (
          <Card key={index}>
            <CardContent>
            <Typography variant="body1">{date}</Typography>
            {dayData.map((entry, idx) => (
              <Typography variant="body2" key={idx}>
                {new Date(entry.dt * 1000).toLocaleTimeString()} - {entry.main.temp}°C - {entry.weather[0].description}
              </Typography>
            ))}</CardContent>
          </Card>
        ))}</div>
      </CardContent>
    </Card>
  );
};

export default Forecast;
