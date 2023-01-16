import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState } from 'react';
const api = {
  key: "b9230736bb7e18c66e3887ef29281385",
  base: "https://api.openweathermap.org/data/2.5/",
  icon:"http://openweathermap.org/img/wn/"
}
const app ={
  
  rain:'rain',
  drizzle:'drizzle',
  thunderstorm:'thunder',
  snow:'snow',
  clearsky:'clearsky',
  clouds:'clouds',
  default:'default'
  }


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
    
  
  function setbg(){
 
    switch(weather.weather[0].main){
      case "Rain" :
        return `${app.rain}`
        break;
      case "Thunderstorm" :
        return `${app.thunderstorm}`
        break;
      case "Drizzle" :
        return `${app.drizzle}`
        break;
      case "Snow" :
        return `${app.snow}`
        break;
      case "Clear" :
        return `${app.clearsky}`
        break;
      case "Clouds" :
        return `${app.clouds}`
        break;
      default:
        return `${app.default}`
    }
  }
  return (
    <div className={(typeof weather.main != "undefined") ? setbg() : 'original'
                     
                  }>
      <main>
        
        {(typeof weather.main != "undefined") ? (
        <div>
          
          <div className="weather-box" class="grid-container">
            <div className="temp" class="item1" >
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='icon' class="item2">
            <img
              src={`${api.icon}${weather.weather[0].icon}@2x.png`}
            />
            </div>
          
          </div>
         

          <div className="location-box">
          <div className="date">{dateBuilder(new Date())}
            </div>
            <div className="location">{weather.name}, {weather.sys.country}
            </div>
            <div className="weather">
              {weather.weather[0].description}
          </div>
            
          </div>



        </div>

        ) : ('')}
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter Zipcode or City"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
