import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "./store/common";
import { citiesList, dayOfTheWeek } from "./constants";
import { baseUrl, keyApi } from "./api";
import "./App.css";

function App() {
  const cityInputRef = useRef(null);
  const dispatch = useDispatch();
  const weather = useSelector(state => state.common?.weather);

  const fetchWeatherData = (query) => {
    fetch(`${baseUrl}/current.json?key=${keyApi}&q=${query || "Tashkent"}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(commonActions.getWeather(data));
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(cityInputRef.current?.value);
    cityInputRef.current.value = "";
  };

  const handleCityClick = (event) => {
    fetchWeatherData(event.target.innerHTML);
  };

  const date = weather?.location?.localtime;
  const year = parseInt(date?.substr(0, 4));
  const month = parseInt(date?.substr(8, 2));
  const day = parseInt(date?.substr(5, 2));
  const time = date?.substr(11);

  return (
    <div
      class={`weather ${
           weather?.current?.is_day === 0
          ? "weather--night"
          : weather?.current?.condition?.text === "Light snow"
          ? "weather--snow"
          : weather?.current?.condition?.text === "Partly cloudy"
          ? "weather--cloudy"
          : "weather--sunny"
      }`}
    >
      <div class="container">
        <h3 class="weather__brand">the weather</h3>
        <div>
          <h1 class="weather__temp">{weather?.current?.temp_c}&#176;</h1>
          <div className="weather__city-wrapper">
            <div class="weather__city-time">
              <h1 class="weather__region-name">{weather?.location?.region}</h1>
              <small>
                <span class="weather__time">{time}</span>-{" "}
                <span class="weather__date">
                  {dayOfTheWeek(day, month, year)} {day}.{month}.{year}
                </span>
              </small>
            </div>
            <div class="weather__agree">
              <img
                src={weather?.current?.condition?.icon}
                class="icon"
                alt="icon"
                width="50"
                height="50"
              />
              <span class="weather__condition">
                {weather?.current?.condition?.text}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="weather__rightebar rightebar-panel">
        <form className="rightebar-panel__form" onSubmit={handleSearchSubmit}>
          <input
            class="rightebar-panel__search"
            type="text"
            placeholder="Search Location..."
            ref={cityInputRef}
          />
          <button type="submit" class="rightebar-panel__submit-btn" />
        </form>
        <ul class="rightebar-panel__cities-list cities-list">
          {citiesList?.map((item, i) => (
            <li key={i} class="cities-list__item" onClick={handleCityClick}>
              {item}
            </li>
          ))}
        </ul>

        <h4 className="right-bar__details-title">Weather Details</h4>
        <ul class="right-bar__details details-list">
          <li className="details-list__item">
            <span>Cloudy </span>
            <span class="cloud">{weather?.current?.cloud}%</span>
          </li>
          <li className="details-list__item">
            <span>Humidity </span>
            <span class="humidity">{weather?.current?.humidity}%</span>
          </li>
          <li className="details-list__item">
            <span>Wind </span>
            <span class="wind">{weather?.current?.wind_kph}km/h</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
