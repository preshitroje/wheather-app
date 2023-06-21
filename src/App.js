import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Weathercard from "./weathercard";
import bgvideo from "../src/assets/video/1.mp4";
// import video from "./star";
const App = () => {
  const [searchValue, setSearchValue] = useState("Pune");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=fd9830553628fe726f977d9c3cb678c8`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        pressure,
        humidity,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);

      console.log(weathermood);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <video src={bgvideo} autoPlay muted loop class="video-bg" />
      <div className="bg-overlay"></div>

      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search city"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="button"
            className="searchButton"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* templet card */}
      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default App;
