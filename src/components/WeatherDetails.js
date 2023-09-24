import { useEffect, useState } from "react"
import clear from '../components/Assets/clear.png'
import cloud from '../components/Assets/cloud.png'
import drizzle from '../components/Assets/drizzle.png'
import rain from '../components/Assets/rain.png'
import snow from '../components/Assets/snow.png'
import humidity_icon from '../components/Assets/humidity.png'
import wind_icon from '../components/Assets/wind.png'


const WeatherDetails = () => {

  const apiKey = `132181ba0bfc716f8f00e2f8d6a7163f`;
  const [cityName,setCityName] = useState('Bhopal');
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [humidity,setHumidity] = useState();
  const [wind, setWind] = useState();
  // const [weatherIcon, setWeatherIcon] = useState();
  const [weatherImage, setWeatherImage] = useState();
  const [weatherDescription, setWeatherDescription] = useState();
  

  const getSerachInput = (e) => {
    setCityName(e.target.value)
  }

    const fetchData = async() => {
    const loader = document.querySelector('.loader');
    
    loader.style.display = 'flex'
   await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
  .then(responce => responce.json())
  .then((data) =>{ 
    loader.style.display = 'none'
    console.log(data)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setWind(data.wind.speed)
    setHumidity(data.main.humidity)
    // setWeatherIcon(data.weather[0].icon)
    setWeatherDescription(data.weather[0].description)

    if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
        setWeatherImage(clear)
      } else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
        setWeatherImage(cloud)
      } else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
        setWeatherImage(drizzle)
      } else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
        setWeatherImage(rain)
      } else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
        setWeatherImage(snow)
      } else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
        setWeatherImage(drizzle)
      } else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
        setWeatherImage(rain)
      } else{
        setWeatherImage(cloud)
      }


   })
  .catch((error) => {
    console.log(error);
    alert('City not found!')
   })
  setCityName('')



  }

  useEffect(() => {
    const loader = document.querySelector('.loader');
    fetchData();
  },[])
    return(
    <div className="container">
          <div className="wrapper">
            <div className="search-bar">
                <input type="search" id="search" placeholder="Enter city" value={cityName} onChange={getSerachInput}/>
                <button className="search-btn" onClick={fetchData} onKeyPress={fetchData}>Search</button>
            </div>
           <div className="weatherData">
           <div className="cloud-image">
                <img src={weatherImage} alt="cloud"/>
            </div>
            <div className="weather-description">{weatherDescription}</div>
            <div className="temp">{temp}°c</div>
            <div className="city">{city}</div>
            <div className="icons">
                <div className="humidity">
                    <img src={humidity_icon} alt="humidity"/>
                    <div className="description">
                        <div className="humidity-percent data">{humidity}%</div>
                        <div className="humidity-text text">humidity</div>
                    </div>
                </div>
                <div className="wind">
                    <img src={wind_icon} alt="wind"/>
                    <div className="description">
                        <div className="wind-data data">{wind} km/h</div>
                        <div className="wind-text text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
           </div>
        <div className="loader">
                 <div> Loading...</div>
                </div>
    </div>
    )
}

export default WeatherDetails