import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highchartsDarkUnica from 'highcharts/themes/dark-unica';

highchartsDarkUnica(Highcharts);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchData, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function fetchData() {
    const response = await fetch('device-ip:port/your-end-point.php');
    const result = await response.json();
    setData(result);
  }

  const temperatureData = data.map(entry => [Date.parse(entry.date), parseFloat(entry.temperature)]);
  const humidityData = data.map(entry => [Date.parse(entry.date), parseFloat(entry.humidity)]);
  const co2Data = data.map(entry => [Date.parse(entry.date), parseFloat(entry.co2)]);
  const tvocData = data.map(entry => [Date.parse(entry.date), parseFloat(entry.tvoc)]);
  const latestTemperatureData = temperatureData && temperatureData.length ? temperatureData[temperatureData.length - 1][1] : null;
  const latestHumidityData = humidityData && humidityData.length ? humidityData[humidityData.length - 1][1] : null;
  const latestTvocData = tvocData && tvocData.length ? tvocData[tvocData.length - 1][1] : null;

  let co2LevelColor = "";
  if (co2Data.length > 0) {
    if (co2Data[co2Data.length - 1][1] < 499) {
      co2LevelColor = "green";
    } else if (co2Data[co2Data.length - 1][1] >= 500 && co2Data[co2Data.length - 1][1] <= 1200) {
      co2LevelColor = "yellow";
    } else {
      co2LevelColor = "red";
    }
  }

  const options = {
    title: {
      text: 'Temperature and Humidity Data'
    },
    xAxis: {
      type: 'datetime',
      min: Date.now() - 24 * 60 * 60 * 41.7, // This displays data for 1 hour.
    },
    yAxis: [{
      title: {
        text: 'Temperature (°C)'
      },
      opposite: true,
    }, {
      title: {
        text: 'Humidity (%)'
      }
    }],
    series: [{
      name: 'Temperature',
      yAxis: 0,
      data: temperatureData
    }, {
      name: 'Humidity',
      yAxis: 1,
      data: humidityData
    }],
    chart: {
      //backgroundColor: "#194D33"
    }
  };

  const co2Options = {
    title: {
      text: 'CO2 Data'
    },
    xAxis: {
      type: 'datetime',
      min: Date.now() - 24 * 60 * 60 * 41.7,
    },
    yAxis: {
      title: {
        text: 'CO2 (ppm)'
      }
    },
    series: [{
      name: 'CO2',
      data: co2Data
    }]
  };

  const tvocOptions = {
    title: {
      text: 'TVOC Data'
    },
    xAxis: {
      type: 'datetime',
      min: Date.now() - 24 * 60 * 60 * 41.7,  //62.5 - 90mins, 41.7 - 60 mins
    },
    yAxis: {
      title: {
        text: 'TVOC (ppb)'
      }
    },
    series: [{
      name: 'TVOC',
      data: tvocData
    }]
  };

  return (
    <div style={{ backgroundColor: "#848482", height: "100%", textAlign: 'center' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div style={{ color: "white", marginTop: "20px" }}>
        <p>Temperature: {latestTemperatureData}°C - Humidity: {latestHumidityData}%</p>
      </div>
      <HighchartsReact highcharts={Highcharts} options={co2Options} />
      <p style={{ color: co2LevelColor }}>Current CO2 level: {co2Data.length > 0 ? co2Data[co2Data.length - 1][1] : ""} ppm</p>
      <HighchartsReact highcharts={Highcharts} options={tvocOptions} />
      <div style={{ color: "white", marginTop: "20px" }}>
        <p>Current TVOC: {latestTvocData} ppb</p>
      </div>
    </div>
  );
};

export default App;
