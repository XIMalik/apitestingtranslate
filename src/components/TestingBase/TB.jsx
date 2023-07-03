import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tb.css";
import "lord-icon-element";
import wind from "/wind2.png";
import thermos from "/celsius.png";
import cloud from "/cloud.png";
import rain from "/rainy.png";
import clock from "/clock.png";
import search from "/search.png";
import lost from "/lost.png";
import add from "/add.png";

export default function TB() {
  //   const [responseData, setResponseData] = useState(null);
  //   const [query, setQuery] = useState("");
  //   const [finalPoint, setFinalPoint] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const options = {
  //         method: "GET",
  //         url: `https://imdb8.p.rapidapi.com/auto-complete?q=+${query}`,
  //         // params: { q: "spiderman" },
  //         headers: {
  //           "X-RapidAPI-Key":
  //             "90a3f38d9amshe9dd1d95499c942p1facaejsn07c2389031d2",
  //           "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  //         },
  //       };

  //       try {
  //         const response = await axios.request(options);
  //         console.log(response.data);
  //         setResponseData(response.data);
  //         return response.data;
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, [finalPoint]);

  //   const onChangeHandler = (e) => {
  //     setQuery(e.target.value);
  //   };
  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     setFinalPoint(query);
  //   };

  //   const successCallback = (position) => {
  //     console.log(position);
  //   };

  //   const errorCallback = (error) => {
  //     console.log(error);
  //   };
  //   const userLocation = navigator.geolocation.getCurrentPosition(
  //     successCallback,
  //     errorCallback
  //   );

  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState("Abeokuta");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchLocation, setSearchLocation] = useState("");
  const [error, setError] = useState(false);
  const [newCity, setNewCity] = useState("");

  const [cities, setCities] = useState([
    "Lagos",
    "Abeokuta",
    "London",
    "Ilorin",
    "Yola",
    "Johannesburg",
  ]);

  const apiKey = "67a106e90af3077610d79e25a1824771";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid city");
        }
      })
      .then((data) => {
        // Process the data received from the API
        setWeatherData(data);
        setError(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error(error);
        setError(true);
      });
  }, [city, apiKey]);

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateCity = (newCity) => {
    setCity(newCity);
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const locationChangeHandler = (e) => {
    setSearchLocation(e.target.value);
  };

  const searchInputCity = (searchCity) => {
    setCity(searchCity);
  };

  const addNewCityHandler = (e) => {
    setNewCity(e.target.value);
  };
  const addNewCity = (addedCity) => {
    setCities([...cities, addedCity]);
  };

  const removeCity = (city) => {
    const updatedCities = cities.filter((item) => item !== city);
    setCities(updatedCities);
  };

  //   const citytime = "Lagos";
  //   $.ajax({
  //     method: "GET",
  //     url: `https://api.api-ninjas.com/v1/worldtime?city=${citytime}`,
  //     headers: { "X-Api-Key": "YOUR_API_KEY" },
  //     contentType: "application/json",
  //     success: function (result) {
  //       console.log(result);
  //     },
  //     error: function ajaxError(jqXHR) {
  //       console.error("Error: ", jqXHR.responseText);
  //     },
  //   });

  const utcTime = new Date();
  const timezoneOffsetSeconds = weatherData.timezone; // Offset of 3600 seconds (1 hour)
  const localTime = new Date(utcTime.getTime() + timezoneOffsetSeconds * 1000);

  localTime.setHours(localTime.getHours() - 1);

  const day = localTime.toLocaleString("en-US", { weekday: "long" });
  const month = localTime.toLocaleString("en-US", { month: "long" });
  const date = localTime.getDate();
  const year = localTime.getFullYear();
  const time = localTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="main content flex gap-3 h-screen p-3">
      {/* <div className="flex flex-col justify-center items-center px-[15px] md:px-[30px]">
        <form
          onSubmit={submitHandler}
          className="w-screen flex justify-center items-center p-12"
        >
          <input
            type="text"
            value={query}
            onChange={onChangeHandler}
            className="w-[50%] bg-white rounded-l-lg h-[40px] px-2"
          />
          <button
            type="submit"
            className="bg-white w-[10%] h-[40px] px-3 rounded-r-lg hover:bg-blue-900"
          >
            Search
          </button>
        </form>

        {responseData ? (
          <div className="moviegrid">
            {responseData.d.map((item) => (
              <div className="movieitem">
                <div className="imagecontainer w-full hover:shadow-2xl hover:shadow-white ease-in-out duration-300 hover:scale-[101%] rounded-lg overflow-hidden h-[90%]">
                  <img
                    src={item.i.imageUrl}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="h-[10%] w-full py-2 bg-transparent">
                  <p className="text-white text-md">{item.l}</p>
                  <p className="text-white/50 text-xs">Starring {item.s}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div> */}
      <div className="weather bg-[#0d0d0d] relative flex justify-center items-center rounded-md w-[85%] h-full">
        {error && (
          <div className="absolute flex flex-col gap-3 justify-center items-center bg-white/10 backdrop-blur-xl rounded-md h-full w-full">
            <img src={lost} alt="" />
            <span className="flex flex-col text-center mb-5">
              <h1 className="text-md">
                We can't find the city <span className="italic">{city}</span>{" "}
                you've requested
              </h1>
              <h1 className="text-sm text-black/50">
                Please check your spelling or try another city
              </h1>
            </span>
            <button
              className="ease-in-out duration-150 text-white px-5 rounded-full"
              onClick={() => setError(false)}
            >
              close
            </button>
          </div>
        )}

        {weatherData ? (
          <div className="weatherDataContainer w-full p-10">
            {
              <div className="main flex flex-col gap-3">
                <div className="locationname&temprature flex justify-between items-end gap-10 mb-5">
                  <div className="flex flex-col gap-2">
                    <div className="locationname&country flex gap-3">
                      <h1 className="text-white text-3xl h-fit">
                        {" "}
                        {weatherData.name}
                      </h1>
                      <span className="text-3xl text-white/10">
                        {weatherData.sys.country}
                      </span>
                    </div>

                    <span className="temperatureintro flex gap-3 items-center">
                      <div className="thermos rounded-full bg-white shadow-lg p-2">
                        <img
                          src={thermos}
                          alt=""
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                      <h1 className="text-white">
                        <span className="text-white/50 text-xs">
                          Currently feels like{" "}
                        </span>
                        {parseInt(weatherData.main.feels_like - 273.15)}°C
                      </h1>
                    </span>
                  </div>
                  <div className="locationcoordinates">
                    <span className="locationcoordinates text-white flex gap-3">
                      <span>
                        <span className="text-xs text-white/50">Longitude</span>{" "}
                        {weatherData.coord.lon}°
                      </span>
                      <span>
                        <span className="text-xs text-white/50">Latitude</span>{" "}
                        {weatherData.coord.lat}°
                      </span>
                    </span>
                  </div>
                </div>
                <div className="upperdivs">
                  <div className="weathermain flex gap-3">
                    <div className="time flex flex-col justify-center items-center gap-5 text-center p-3 text-white bg-[#1e1d1d] text-sm w-[25%] rounded-md">
                      <div className="rounded-full bg-white p-5">
                        <img
                          src={clock}
                          alt=""
                          className="w-[30px] h-[30px] text-blue-500"
                        />
                      </div>

                      <span>{`${time}`}</span>
                    </div>
                    <div className="clouds flex flex-col justify-center items-center gap-5 text-center p-3 w-[25%] text-white bg-[#1e1d1d] text-sm rounded-md">
                      <div className="rounded-full bg-white p-5">
                        <img
                          src={cloud}
                          alt=""
                          className="w-[30px] h-[30px] text-blue-500"
                        />
                      </div>

                      <span>
                        The skies are {weatherData.clouds.all}% covered
                      </span>
                    </div>
                    <div className="winds flex flex-col justify-center items-center gap-5 text-center p-3 text-white bg-[#1e1d1d] text-sm w-[25%] rounded-md">
                      <div className="rounded-full bg-white p-5">
                        <img
                          src={wind}
                          alt=""
                          className="w-[30px] h-[30px] text-blue-500"
                        />
                      </div>

                      {weatherData.wind.speed <= 0.9999 && (
                        <span>Calm winds</span>
                      )}
                      {weatherData.wind.speed >= 1 &&
                        weatherData.wind.speed <= 1.9 && (
                          <span>Light air in the area</span>
                        )}
                      {weatherData.wind.speed >= 2 &&
                        weatherData.wind.speed <= 3.4 && (
                          <span>Light breeze in the area</span>
                        )}
                      {weatherData.wind.speed >= 3.5 &&
                        weatherData.wind.speed <= 5.5 && (
                          <span>Gentle breeze, twigs swaying</span>
                        )}
                      {weatherData.wind.speed >= 5.6 &&
                        weatherData.wind.speed <= 8 && (
                          <span>Moderate breeze, branches swaying</span>
                        )}
                      {weatherData.wind.speed >= 8.1 &&
                        weatherData.wind.speed <= 10.5 && (
                          <span>Fresh breeze, small trees sway</span>
                        )}
                      {weatherData.wind.speed >= 10.6 &&
                        weatherData.wind.speed <= 13.5 && (
                          <span>Strong breeze, large branches sway</span>
                        )}
                      {weatherData.wind.speed >= 13.6 &&
                        weatherData.wind.speed <= 16.5 && (
                          <span>Moderate gale, whole trees sway</span>
                        )}
                      {weatherData.wind.speed >= 16.6 &&
                        weatherData.wind.speed <= 20 && (
                          <span>Fresh gale, difficult walking aginst wind</span>
                        )}
                      {weatherData.wind.speed >= 20.1 &&
                        weatherData.wind.speed <= 23.5 && (
                          <span>Strong gale, slight building damage</span>
                        )}
                      {weatherData.wind.speed >= 23.6 &&
                        weatherData.wind.speed <= 27.5 && (
                          <span>
                            Whole gale, uprooted trees and major building damage
                          </span>
                        )}
                      {weatherData.wind.speed >= 27.6 &&
                        weatherData.wind.speed <= 31.5 && (
                          <span>
                            A storm causing widespread damage. Stay indoors
                          </span>
                        )}
                      {weatherData.wind.speed >= 31.6 && (
                        <span>Hurricane in the area, stay indoors.</span>
                      )}
                    </div>

                    {weatherData.rain && (
                      <div className="rain flex flex-col justify-center items-center gap-5 text-center p-3 text-white bg-[#1e1d1d] text-sm w-[25%] rounded-md">
                        <div className="rounded-full bg-white p-5">
                          <img
                            src={rain}
                            alt=""
                            className="w-[30px] h-[30px] text-blue-500"
                          />
                        </div>

                        {weatherData.rain["1h"] >= 0.1 &&
                          weatherData.rain["1h"] <= 0.29 && (
                            <div className="hello">
                              Light precipitation, no rain
                            </div>
                          )}
                        {weatherData.rain["1h"] >= 0.3 &&
                          weatherData.rain["1h"] <= 0.49 && (
                            <div className="hello">
                              A chance of light rain in the area
                            </div>
                          )}
                        {weatherData.rain["1h"] >= 0.5 &&
                          weatherData.rain["1h"] <= 1 && (
                            <div className="hello">
                              There is rainfall in the area
                            </div>
                          )}
                        {weatherData.rain["1h"] >= 1 && (
                          <div className="hello">Heavy rain in the area</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="lowerdivs moredata flex gap-3">
                  <div className="additionaldata temp&wind bg-[#1e1d1d] rounded-md p-3 flex gap-3 text-white">
                    <div className="temperaturedata bg-[#161515] p-3 rounded-md">
                      <h1 className="mb-3">Temperature</h1>
                      <div className="flex flex-col gap-2">
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Actual temperature <br />
                            </span>
                            {parseInt(weatherData.main.temp - 273.15)}°C
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Currently feels like <br />
                            </span>
                            {parseInt(weatherData.main.feels_like - 273.15)}°C
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Max. temprature <br />
                            </span>
                            {parseInt(weatherData.main.temp_max - 273.15)}°C
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Min. temprature <br />
                            </span>
                            {parseInt(weatherData.main.temp_min - 273.15)}°C
                          </h1>
                        </span>
                      </div>
                    </div>
                    <div className="winddata bg-[#161515] p-3 rounded-md">
                      <h1 className="mb-3">Wind</h1>
                      <div className="flex flex-col gap-2">
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Direction of wind travel <br />
                            </span>
                            {parseInt(weatherData.wind.deg)}°
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Wind travel speed <br />
                            </span>
                            {parseInt(weatherData.wind.speed)}m/s
                          </h1>
                        </span>

                        {weatherData.wind.gust && (
                          <span>
                            <h1 className="">
                              <span className="text-white/50 text-xs">
                                Gust <br />
                              </span>
                              {parseInt(weatherData.wind.gust)}m/s
                            </h1>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="additionaldata misc&time bg-[#1e1d1d] rounded-md p-3 w-[350px] flex gap-3 text-white">
                    <div className="miscellaniuosdata bg-[#161515] w-[50%] p-3 rounded-md">
                      <h1 className="mb-3">Misc</h1>
                      <div className="flex flex-col gap-2">
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Timezone <br />
                            </span>
                            {weatherData.timezone} UTC
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Visibility <br />
                            </span>
                            {weatherData.visibility}
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Humidity <br />
                            </span>
                            {weatherData.main.humidity}
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Pressure <br />
                            </span>
                            {weatherData.main.pressure}
                          </h1>
                        </span>
                      </div>
                    </div>
                    <div className="timedata bg-[#161515] p-3 rounded-md w-[50%]">
                      <h1 className="mb-3">Time</h1>
                      <div className="timedata flex flex-col gap-2">
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Day <br />
                            </span>
                            {day}
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Month <br />
                            </span>
                            {month}
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Date <br />
                            </span>
                            {date}
                          </h1>
                        </span>
                        <span>
                          <h1 className="">
                            <span className="text-white/50 text-xs">
                              Year <br />
                            </span>
                            {year}
                          </h1>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="solodisplay additionaldata3 p-3 w-[300px] rounded-md flex gap-3 text-white">
                    <div className="conditions p-3 rounded-md">
                      <div className="flex flex-col gap-2">
                        <span className="mb-3">
                          <h1 className="text-3xl">
                            {weatherData.weather[0].main}
                          </h1>
                          <h1 className="text-white/50 text-sm">
                            {weatherData.weather[0].description}
                          </h1>
                        </span>
                        {weatherData.weather[0].main === "Clouds" && (
                          <div className="condition">
                            <h1>Currently mostly cloudy</h1>
                            <p>Expect partially covered skies with clouds.</p>
                          </div>
                        )}

                        {weatherData.weather[0].main === "Rain" && (
                          <div className="condition">
                            <h1>Rainy weather</h1>
                            <p>Expect showers and rainy conditions.</p>
                          </div>
                        )}

                        {weatherData.weather[0].main === "Mist" && (
                          <div className="condition">
                            <h1>Misty conditions</h1>
                            <p>
                              Expect reduced visibility due to mist and fog.
                            </p>
                          </div>
                        )}

                        {weatherData.weather[0].main === "Clear" && (
                          <div className="condition">
                            <h1>Clear skies</h1>
                            <p>
                              The skies are clear, enjoy the sunny and warm
                              weather.
                            </p>
                          </div>
                        )}
                        {weatherData.weather[0].main === "Haze" && (
                          <div className="condition">
                            <h1>Haze in the atmosphere</h1>
                            <p>
                              There may be particles in the air which may result
                              in reduced visibility
                            </p>
                          </div>
                        )}
                        {weatherData.weather[0].main === "Drizzle" && (
                          <div className="condition">
                            <h1>Light downpour</h1>
                            <p>
                              A light drizzle at the moment, there is a chance
                              rain might follow
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }{" "}
          </div>
        ) : (
          <div className="loadinganimation flex justify-center items-center h-full">
            <div class="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <div className="locationscarousel flex flex-col gap-3 w-[15%] min-w-[200px] bg-[#0d0d0d] h-[100%] overflow-y-scroll no-scrollbar rounded-md p-3">
        <div className="flex h-[40px] items-center sticky top-0 z-50">
          <input
            type="text"
            value={searchLocation}
            onChange={locationChangeHandler}
            placeholder="Gotham City"
            className="bg-[#161515] h-[100%] p-2 placeholder:text-white/20 text-white focus:outline-none text-sm focus:bg-[#1e1d1d] hover:bg-[#1e1d1d] rounded-l-lg w-[80%] shadow-xl"
          ></input>
          <button
            onClick={() => searchInputCity(searchLocation)}
            className="w-[20%] h-[100%] flex justify-center rounded-r-lg items-center bg-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/xfftupfv.json"
              trigger="hover"
              colors="primary:#121331"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
          </button>
        </div>
        <div className="locations rounded-full w-full flex flex-col items-start gap-3">
          {cities.map((cityitem) => (
            <div key={cityitem} className="w-full">
              <button
                onClick={() => updateCity(cityitem)}
                className="citybutton bg-[#161515] hover:bg-[#1e1d1d] rounded-lg w-[100%] overflow-hidden"
              >
                <div className="location p-2 w-full flex justify-between align-center items-center">
                  <p className="text-white text-sm">{cityitem}</p>
                  <div className="flex flex-col items-start text-xs gap-[1px] text-white/50">
                    <lord-icon
                      src="https://cdn.lordicon.com/zzcjjxew.json"
                      trigger="hover"
                      colors="primary:#ffffff,secondary:#ffff"
                      style={{ width: "35px", height: "35px" }}
                    ></lord-icon>
                  </div>
                </div>
                <button
                  onClick={() => removeCity(cityitem)}
                  className="overlay rounded-md flex justify-between p-2 items-center backdrop-blur-lg text-white text-sm"
                >
                  <span>Remove</span>
                  <lord-icon
                    src="https://cdn.lordicon.com/nhfyhmlt.json"
                    trigger="hover"
                    colors="primary:#ffff"
                    style={{ width: "25px", height: "25px" }}
                  ></lord-icon>
                </button>
              </button>
            </div>
          ))}
        </div>
        <div className="addnewcity h-[40px] flex items-center sticky bottom-0">
          <input
            type="text"
            value={newCity}
            onChange={addNewCityHandler}
            placeholder="Add a city"
            className="bg-[#161515] p-2 h-[100%] placeholder:text-white/20 text-white focus:outline-none text-sm focus:bg-[#1e1d1d] hover:bg-[#1e1d1d] rounded-l-lg w-[80%] "
          ></input>
          <button
            onClick={() => addNewCity(newCity)}
            className="w-[20%] h-[100%] p-2 flex justify-center  rounded-r-lg items-center bg-white hover:bg-green-600 ease-in-out duration-150"
          >
            <img src={add} alt="" className="w-[25px] h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
