'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { defaultWeatherData } from "@/lib/data";
import { WeatherData, ForecastData, List } from "@/lib/definitions";
import Image from "next/image";
import cloudImg from "@/public/fluent--weather-cloudy-filled.svg";
import rainyCloud from "@/public/rainy-cloud.svg";
import cityImg from "@/public/cityImg.jpeg";
import sunsetImg from "@/public/sunset.svg";
import sunriseImg from "@/public/sunrise.svg";

import 'primeicons/primeicons.css';

const imageLoader = ({ src, width, quality }: any) => {
  return `https://openweathermap.org/img/wn/${src}@4x.png?w=${width}&q=${quality || 75}`
}


const Page = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData);
  const [forecastData, setForecastData] = useState<ForecastData>()
  const [searchQuery, setSearchQuery] = useState<string>('Accra');
  const [unit, setUnit] = useState("metric");
  const [metric, setMetric] = useState(true);
  const [forecastPeriod, setForecastPeriod] = useState("today");
  const [activeIndex, setActiveIndex] = useState(0);

  const apiKey = "634caabc9bb4672b24050648b3d9400d" //process.env.NEXT_PUBLIC_API_KEY;
  const displayingDates: string[] = []; 

  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=${unit}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}&units=${unit}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(weatherApiUrl);

        if (response.data) {
          setWeatherData(response.data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [searchQuery, unit]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(forecastApiUrl);

        if (response.data) {
          setForecastData(response.data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchForecastData();
  }, [searchQuery, unit])

  const handleFiveDaysButton = () => {
    setForecastPeriod("5days");
  }

  function convertToLocalTime(dt: number) {
    const date = new Date(dt * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    const time = [year, month, day, hours, minutes, seconds, period];

    return time;

}

  const icon: any = weatherData?.weather[0].icon;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  }

  const arr: string[] = [];
    const forecastList: List[] | undefined= forecastData?.list; 
    if(typeof forecastList === "undefined") {
      return false;
    } else {
      for(let obj of forecastList) {
        let detailedDate = obj.dt_txt;
        let date = detailedDate.slice(0, 10)
        let isAvailable = arr.includes(detailedDate.slice(0, 10))
        if(isAvailable) {
           false;
        } else {
          arr.push(date);
          displayingDates.push(detailedDate);
        }
      }
    }

  const filteredList: List[] | undefined = forecastData?.list.filter(item =>
    displayingDates.some(date => item.dt_txt.includes(date))
  );

  const sunriseTime = convertToLocalTime(Number(weatherData?.sys.sunrise));
  const sunsetTime = convertToLocalTime(Number(weatherData?.sys.sunset));
  let indexObj = typeof filteredList === "undefined" ? undefined : filteredList[activeIndex];

  return (
    <div  className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between p-0 w-full">
      <section className="flex flex-col items-center md:w-[25%] lg:w-[25%] md:h-screen lg:h-screen md:border lg:border px-10 py-5 md:border-r-2 lg:border-r-2 border-gray-100 md:shadow-xl lg:shadow-xl bg-white md:fixed lg:fixed">
        <div id="navbar" className="md:hidden lg:hidden fixed flex flex-row justify-between items-center my-2 h-12 border-gray-100 shadow-sm border-b-2 w-[88%] bg-[#fff] z-10">
            <span className="flex flex-row justify-between w-[37%]">
              <button
              className={`${forecastPeriod==="today"? "": "text-[#bababa]"}`}
              onClick={()=> setForecastPeriod("today")}
              > Today </button>
              <button
              className={`${forecastPeriod==="5days"? "": "text-[#bababa]"}`}
              onClick={handleFiveDaysButton}
              > 6 days </button>
            </span>
            <span className="h-full flex flex-row items-center">
              <button 
              className={`bg-[#000S] rounded-full w-9 flex justify-center items-center h-9 ${metric? "bg-black text-white": "text-black bg-white"}`}
              onClick={() => {
                setMetric(true);
                setUnit("metric");
              }
              }
              > °C </button>
              <button 
              className={`rounded-full w-9 flex justify-center items-center h-9 ${metric===false? "bg-black text-white": "text-black bg-white"}`}
              onClick={() => {
                setMetric(false);
                setUnit("imperical")
              }
              }
              > °F </button>
            </span>
        </div>
        <span className="p-input-icon-left mt-20 md:mt-5 lg:mt-5 w-full">
            <i className="pi pi-search pl-2" />
            <InputText 
            className="pl-7 border outline-none w-full h-10 rounded-md"
            placeholder="search for city..." 
            onChange={handleSearch}
            />
        </span>
        <div className="flex flex-col items-center border-gray-100 shadow-sm border-b-2 pb-8">
          {
            typeof weatherData.weather[0].icon === "string" ? 
            <Image
              loader={imageLoader}
              src={icon}
              alt="Image"
              width={200}
              height={200}
            /> : 
          <div className="animate-pulse bg-[#def4fc] py-8 w-[140px] h-[140px] rounded-full mt-[30px]">
          </div>
          }
          <div className="text-[70px]"> 
          {
            typeof weatherData?.main.temp === "number" ? `${weatherData?.main.temp}${unit==="metric"? "°C": "°F"}` : 
            <div className="animate-pulse bg-[#def4fc] w-[240px] rounded-full mt-[60px] h-[60px]">
            </div>
          }
          </div>
          
            {
              typeof weatherData.dt === "number" ?
              <div className="text-[#bababa]">
                <span className="text-black"> {`${days[Number(convertToLocalTime(weatherData.dt)[2])-4]},`} </span> {`${convertToLocalTime(weatherData.dt)[3]}: ${convertToLocalTime(weatherData.dt)[4]}`} 
              </div>
            :
            <div className="animate-pulse bg-[#def4fc] py-4 w-[90px] rounded-full mt-3 h-[10px]">
            </div>
            }
          </div>
        <div className="pt-[30px]">
          <span className="flex flex-row justify-left items-center"> 
          <Image
            src={cloudImg}
            alt=""
            width={40}
            height={40}
          />
            <span>
              {
                typeof weatherData.clouds.all === "number" ? <span> Cloudy @ {weatherData.clouds.all}%</span> 
                : 
                <div className="animate-pulse bg-[#def4fc] w-[35px] rounded-full h-[20px]">
                </div>
              } 
            </span>
          </span>
          <span className="flex flex-row justify-left items-center"> 
          {/* #def4fc */}
          <Image
            src={rainyCloud}
            alt=""
            width={40}
            height={40}
          />
            <span> 
            {
                typeof weatherData.weather[0].main === "string" ? <span> Main: {weatherData.weather[0].main}</span> 
                : 
                <div className="animate-pulse bg-[#def4fc] w-[35px] rounded-full h-[20px]">
                </div>
              } 
            </span>
          </span>
        </div>
        <span className="hidden md:flex relative mt-5 lg:flex justify-center items-center bg-black rounded-lg"> 
          <Image
            src={cityImg}
            alt=""
            width={300}
            height={100}
            className="h-[100px] rounded-lg opacity-80"
          />
          <span className="absolute text-white font-extrabold"> {`${weatherData?.name}, ${weatherData?.sys.country}`} </span>
        </span>
      </section>
      <section className="flex flex-col w-[110%] md:ml-[28%] lg:ml-[28%]">
        <div id="navbar" className="hidden fixed lg:flex md:flex flex-row justify-between items-center px-4 mt-8 h-12 border-gray-100 shadow-sm border-b-2 w-[70%] bg-white">
          <span className="flex flex-row justify-between w-[12%]">
            <button
            className={`${forecastPeriod==="today"? "": "text-[#bababa]"}`}
            onClick={()=> setForecastPeriod("today")}
            > Today </button>
            <button 
            className={`${forecastPeriod==="5days"? "": "text-[#bababa]"}`}
            onClick={handleFiveDaysButton}
            > 6 days </button>
          </span>
          <span className="h-full flex flex-row items-center">
            <button 
            className={`bg-[#000S] rounded-full w-9 flex justify-center items-center h-9 ${metric? "bg-black text-white": "text-black bg-white"}`}
            onClick={() => {
              setMetric(true);
              setUnit("metric");
            }
            }
            > °C </button>
            <button 
            className={`rounded-full w-9 flex justify-center items-center h-9 ${metric===false? "bg-black text-white": "text-black bg-white"}`}
            onClick={() => {
              setMetric(false);
              setUnit("imperical")
            }
            }
            > °F </button>
          </span>
        </div>
        {
          forecastPeriod === "today" ?
        <div className="mt-[30px] md:mt-[80px] lg:mt-[80px]">
          <div className="w-full flex flex-col">
            <span className="pl-4">
              <div className="font-bold text-[20px] pt-5"> Description </div>
              {
                typeof weatherData?.weather[0].description === "string" ? <span> {weatherData?.weather[0].description} </span>
                : 
                <div className="animate-pulse bg-[#def4fc] w-[250px] rounded-full h-[20px]">
                </div>
              } 
            </span>
            <div className="mt-[40px] flex flex-col">
              <span className="font-bold text-[20px] pl-3"> Highlights </span>
              <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 md:grid-rows-2 place-items-center lg:grid-rows-2 grid-rows-3 gap-y-4 py-4">
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Sunrise & Sunset </span>
                  <div className="">
                    <span className="flex flex-row justify-center items-center">
                      <Image
                        src={sunriseImg}
                        alt=""
                        width={70}
                        height={70}
                        className="rounded-lg"
                      />
                      {
                        typeof weatherData?.sys.sunrise === "number" ? <span className="text-[18px] md:text-[22px] font-bold lg:text-[20px]"> {`${sunriseTime[3]}:${sunriseTime[4]} ${sunriseTime[6]}`}</span>
                        : 
                        <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[30px]">
                        </div>
                      }
                    </span>
                    <span className="flex flex-row justify-center items-center">
                      <Image
                        src={sunsetImg}
                        alt=""
                        width={70}
                        height={70}
                        className="rounded-lg"
                      />
                      {
                        typeof weatherData?.sys.sunset === "number" ? <span className="text-[18px] md:text-[22px] font-bold lg:text-[20px]">  {`${sunsetTime[3]}:${sunsetTime[4]} ${sunsetTime[6]}`} </span>
                        : 
                        <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[30px]">
                        </div>
                      }
                    </span>
                  </div>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Min Temperature </span>
                  {
                    typeof weatherData?.main.temp_min === "number" ? <span className="font-semibold text-[30px]"> {`${weatherData?.main.temp_min}${unit==="metric"? "°C": "°F"}`} </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Max Temperature </span>
                  {
                    typeof weatherData?.main.temp_max === "number" ? <span className="font-semibold text-[30px]"> {`${weatherData?.main.temp_max}${unit==="metric"? "°C": "°F"}`} </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Humidity </span>
                  {
                    typeof weatherData?.main.humidity === "number" ? <span className="font-semibold text-[30px]"> {weatherData?.main.humidity}% </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Wind Status </span>
                  {
                    typeof weatherData?.wind.speed === "number" ? <span className="font-semibold text-[30px]"> {weatherData?.wind.speed} <span className="text-[30px]"> km/h </span> </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Visibility </span>
                  {
                    typeof weatherData?.visibility === "number" ? <span className="font-semibold text-[30px]"> {`${Number(weatherData?.visibility)/1000}`}<span className="text-[30px]">km</span> </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 md:pt-3 lg:pt-3">
            <span className="font-bold"> Key: </span>
            <div className="flex flex-row justify-around md:w-[400px] lg:w-[400px]">
              <div className="flex fle-row justify-center items-center">
                <Image
                  src={sunriseImg}
                  alt=""
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
                <span> Sunrise </span>
              </div>
              <div className="flex fle-row justify-center items-center">
                <Image
                  src={sunsetImg}
                  alt=""
                  width={70}
                  height={70}
                  className="rounded-lg"
                />
                <span> Sunset </span>
              </div>
            </div>
          </div>
          <div className="block md:hidden lg:hidden px-[10px]">
            <span className="relative mt-5 flex justify-center items-center bg-black rounded-t-lg"> 
              <Image
                src={cityImg}
                alt=""
                width={300}
                height={100}
                className="h-[100px] rounded-lg opacity-80 w-full"
              />
              <span className="absolute text-white font-extrabold"> {`${weatherData?.name}, ${weatherData?.sys.country}`} </span>
            </span>
          </div>
        </div>
        :
        //  5 days
        <div className="mt-[90px]">
          <span className="italic text-[#bababa] md:fixed lg:fixed top-[80px] z-20"> Please click to preview </span>
          <div className="grid grid-cols-6 grid-rows-1 item gap-x-[130px] md:gap-0 lg:gap-0 md:flex lg:flex md:flex-row lg:flex-row pt-5 pb-3 md:fixed lg:fixed bg-white md:w-full lg:w-full overflow-auto">
            {
              typeof filteredList === "undefined"? <></> :
              filteredList.map((preview, index) => {
                const date = new Date(preview.dt_txt.slice(0, 10));
                const dayIndex = date.getDay();
                const dayName = days[dayIndex];
                return (
                  <div 
                  key={index} 
                  className="flex flex-col items-center border shadow-md w-[30vw] md:w-[120px] lg:w-[120px] md:h-[190px] lg:h-[190px] py-4 mx-2 rounded-xl cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                  >
                    <span> {dayName} </span>
                    <Image
                    loader={imageLoader}
                      src={preview.weather[0].icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-[100px] w-[100px] rounded-lg opacity-80"
                    />
                    <span> {`${preview.main.temp}${unit==="metric"? "°C": "°F"}`} </span>
                  </div>
                )
              })
            }
          </div>
          <div className="mt-[60px] md:mt-[250px] lg:mt-[250px]">
            <span className="font-bold text-[20px] pl-3"> Preview </span>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 md:grid-rows-2 place-items-center lg:grid-rows-2 grid-rows-3 gap-y-4 py-4">
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Min Temperature </span>
                  {
                    typeof weatherData?.main.temp_min === "number" ? <span className="font-semibold text-[30px]"> {`${typeof indexObj === "undefined" ? "N/A" : indexObj.main.temp_min}${unit==="metric"? "°C": "°F"}`} </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Max Temperature </span>
                  {
                    typeof weatherData?.main.temp_max === "number" ? <span className="font-semibold text-[30px]"> {`${typeof indexObj === "undefined" ? "N/A" : indexObj.main.temp_max}${unit==="metric"? "°C": "°F"}`}</span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Humidity </span>
                  {
                    typeof weatherData?.main.humidity === "number" ? <span className="font-semibold text-[30px]"> {typeof indexObj === "undefined" ? "N/A" : indexObj.main.humidity}% </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Wind Status </span>
                  {
                    typeof weatherData?.wind.speed === "number" ? <span className="font-semibold text-[30px]"> {typeof indexObj === "undefined" ? "N/A" : indexObj.wind.speed} <span className="text-[30px]"> km/h </span> </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                  <span className="text-[20px] text-[#bababa]"> Visibility </span>
                  {
                    typeof weatherData?.visibility === "number" ? <span className="font-semibold text-[30px]"> {typeof indexObj === "undefined" ? "N/A" : Number(indexObj.visibility)/1000} <span className="text-[30px]">km</span> </span>
                    : 
                    <div className="animate-pulse bg-[#def4fc] w-[120px] rounded-full h-[50px]">
                    </div>
                  }
                  <span> Normal</span>
                </div>
                </div>
          </div>
        </div>
        }
      </section>   
    </div>
  )
}



export default Page;
