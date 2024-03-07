'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { WeatherData } from "@/lib/types";
import Image from "next/image";
import sunCloudImg from "@/public/sun-cloud.png";
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
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [searchQuery, setSearchQuery] = useState<string>('Accra');
  // const [city, setCity] = useState('Accra');
  const [unit, setUnit] = useState("metric");
  const [metric, setMetric] = useState(true);

  const apiKey = "634caabc9bb4672b24050648b3d9400d";
  const cityInputtedByUser = "Nsawam";

  // let temperatureSymobol = units === 'imperial' ? "°F" : "°C";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=${unit}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(apiUrl);

        if (response.data) {
          setWeatherData(response.data);
          // console.log(response.data.weather?.[0].icon)
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [searchQuery, unit]);


  function convertToLocalTime(dt: number) {
    const date = new Date(dt * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert 24-hour to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    // Formatted date string in the format: YYYY-MM-DD hh:mm:ss AM/PM
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${period}`;
    return `${hours}:${minutes} ${period}`

}

  const icon: any = weatherData?.weather[0].icon;

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
  }

  const handleMetricUnit = () => {
    setMetric(!metric);
  }
  // const handleCityChange = () => {
  //   setCity(searchQuery);
  // }



  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between p-0 w-full">
      <section className="flex flex-col w-full md:w-[25%] lg:w-[25%] md:h-screen lg:h-screen border px-10 py-5 border-r-2 border-gray-100 md:shadow-xl lg:shadow-xl bg-white md:fixed lg:fixed">
      <div id="navbar" className="md:hidden lg:hidden fixed flex flex-row justify-between items-center my-2 h-12 border-gray-100 shadow-sm border-b-2 w-[88%] bg-[#fff] z-10">
          <span className="flex flex-row justify-between w-[37%]">
            <button> Today </button>
            <button className="text-[#bababa]"> 5 days </button>
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
      <span className="p-input-icon-left mt-20">
          <i className="pi pi-search pl-2" />
          <InputText 
          className="pl-7 border outline-none w-full h-10 rounded-md"
          placeholder="search for city..." 
          onChange={handleSearch}
          />
          {/* <Button 
          label="Search" 
          className="p-button-sm p-button-rounded p-button-secondary" 
          onClick={handleCityChange}
          /> */}
      </span>
      <div className="flex flex-col items-center border-gray-100 shadow-sm border-b-2 pb-8">
        <Image
          loader={imageLoader}
          src={icon}
          alt="Image"
          width={200}
          height={200}
        />
        <div className="text-[70px]"> {`${weatherData?.main.temp}${unit==="metric"? "°C": "°F"}`} </div>
        <div className="text-[#bababa]"> <span className="text-black"> Monday, </span> 16:00 </div>
      </div>
      <div className="pt-[30px]">
        <span className="flex flex-row justify-left items-center"> 
        <Image
          src={cloudImg}
          alt=""
          width={40}
          height={40}
        />
          <span>Mostly Cloudy</span>
        </span>
        <span className="flex flex-row justify-left items-center"> 
        {/* #def4fc */}
        <Image
          src={rainyCloud}
          alt=""
          width={40}
          height={40}
        />
          <span>Rain - 30%</span>
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
        <span className="absolute text-white font-extrabold"> {weatherData?.name} </span>
      </span>
      </section>
      <section className="flex flex-col w-full md:ml-[28%] lg:ml-[28%]">
        <div id="navbar" className="hidden lg:flex md:flex flex-row justify-between items-center px-4 mt-8 h-12 border-gray-100 shadow-sm border-b-2">
          <span className="flex flex-row justify-between w-[12%]">
            <button> Today </button>
            <button className="text-[#bababa]"> 5 days </button>
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
        <div className="w-full flex flex-col">
          <span className="pl-4">
            <div className="font-bold text-[20px] pt-5"> Description </div>
            <span> {weatherData?.weather[0].description} </span>
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
                    <span className="text-[18px]"> {convertToLocalTime(Number(weatherData?.sys.sunrise))}</span>
                  </span>
                  <span className="flex flex-row justify-center items-center">
                    <Image
                      src={sunsetImg}
                      alt=""
                      width={70}
                      height={70}
                      className="rounded-lg"
                    />
                    <span className="text-[18px]">  {convertToLocalTime(Number(weatherData?.sys.sunset))} </span>
                  </span>
                </div>
              </div>
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                <span className="text-[20px] text-[#bababa]"> Min Temperature </span>
                <span className="font-semibold text-[30px]"> {`${weatherData?.main.temp_min}${unit==="metric"? "°C": "°F"}`} </span>
                <span> Normal</span>
              </div>
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                <span className="text-[20px] text-[#bababa]"> Max Temperature </span>
                <span className="font-semibold text-[30px]"> {`${weatherData?.main.temp_max}${unit==="metric"? "°C": "°F"}`} </span>
                <span> Normal</span>
              </div>
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                <span className="text-[20px] text-[#bababa]"> Humidity </span>
                <span className="font-semibold text-[30px]"> {weatherData?.main.humidity} </span>
                <span> Normal</span>
              </div>
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                <span className="text-[20px] text-[#bababa]"> Wind Status </span>
                <span className="font-semibold text-[30px]"> {weatherData?.wind.speed} <span className="text-[30px]"> km/h </span> </span>
                <span> Normal</span>
              </div>
              <div className="rounded-[10px] shadow-md transition-shadow duration-500 delay-200 hover:shadow-xl flex flex-col justify-center items-center border md:w-[250px] lg:w-[250px] w-[160px] py-8 md:h-[220px] lg:h-[220px] h-[170px]">
                <span className="text-[20px] text-[#bababa]"> Visibility </span>
                <span className="font-semibold text-[30px]"> {`${Number(weatherData?.visibility)/1000}`}<span className="text-[30px]">km</span> </span>
                <span> Normal</span>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden lg:hidden px-5">
          <span className="font-bold"> Key: </span>
          <div className="flex fle-row justify-around">
            <div className="flex fle-row justify-center items-center">
              <Image
                src={sunsetImg}
                alt=""
                width={70}
                height={70}
                className="rounded-lg"
              />
              <span> Sunrise </span>
            </div>
            <div className="flex fle-row justify-center items-center">
              <Image
                src={sunriseImg}
                alt=""
                width={70}
                height={70}
                className="rounded-lg"
              />
              <span> Sunset </span>
            </div>
          </div>
        </div>
        <div className="px-[10px]">
          <span className="relative mt-5 flex justify-center items-center bg-black rounded-t-lg"> 
            <Image
              src={cityImg}
              alt=""
              width={300}
              height={100}
              className="h-[100px] rounded-lg opacity-80 w-full"
            />
            <span className="absolute text-white font-extrabold"> {weatherData?.name} </span>
          </span>
        </div>
      </section>
    </div>
  )
}



export default Page;
