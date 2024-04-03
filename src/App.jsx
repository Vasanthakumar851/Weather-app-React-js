import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/images/search.png";
import clearIcon from "./assets/images/clear.png";
import cloudIcon from "./assets/images/clouds.png";
import drizzleIcon from "./assets/images/drizzle.png";
import rainIcon from "./assets/images/rain.png";
import windIcon from "./assets/images/kite.png";
import snowIcon from "./assets/images/snow.png";
import humidityIcon from "./assets/images/weather.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="clearIcon" />
      </div>
      <div className="temp">{temp}℃</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humdityIcon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      {/* <div className="copyright">
        <p>
          Designed By <b>Vasanth</b>
        </p>
      </div> */}
    </>
  );
};

function App() {
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [text, setText] = useState("");
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "11n": windIcon,
  };

  async function search() {
    setLoading(true);
    const api_key = "c2dab258e4a919d0ea09c3eae980fed6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    setCity(data.name);
    setTemp(Math.floor(data.main.temp));
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setCountry(data.sys.country);

    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || clearIcon);

    //   try {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     if (data.cod == "404") {
    //       console.error("City Name Not Found");
    //       setCityNotFound(true);
    //       setLoading(false);
    //       setHumidity(data.main.humidity);
    //       setWind(data.wind.speed);
    //       setTemp(math.floor(data.main.temp));
    //       setCity(data.name);
    //       setCountry(data.sys.country);
    //       setLog(data.main.pressure);
    //       setLat(data.main.temp_min);
    //     }
    //   } catch (error) {
    //     console.error("City name not Found", error.message);
    //   } finally {
    //     setLoading(false);
    //   }
  }

  const handlecity = (e) => {
    setText(e.target.value);
  };

  const handlekeyDown = (e) => {
    if (e.key == "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handlecity}
            value={text}
            onKeyDown={handlekeyDown}
          />
          <div className="search-icon">
            <img src={searchIcon} alt="Search" onClick={() => search()} />
          </div>
        </div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      </div>
    </>
  );
}

export default App;
