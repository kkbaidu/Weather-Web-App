'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { apiData } from "@/lib/types";
import Image from "next/image";
import sunCloudImg from "@/public/sun-cloud.png";
import cloudImg from "@/public/fluent--weather-cloudy-filled.svg";
import rainyCloud from "@/public/rainy-cloud.svg";
import cityImg from "@/public/cityImg.jpeg";


import 'primeicons/primeicons.css';
        

const Page = () => {
  const [data, setData] = useState();
  const [city, setCity] = useState<string>();

  const apiKey = "634caabc9bb4672b24050648b3d9400d";
  const cityInputtedByUser = "Nsawam";
  let units = "imperial";
  let temperatureSymobol = units === 'imperial' ? "°F" : "°C";
  const icon = '';
  let image = `https://openweathermap.org/img/wn/${icon}@4x.png`

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputtedByUser}&appid=${apiKey}&units=${units}`;

  useEffect(() => {
    axios.get(apiUrl)
    .then((res) => setData(res.data))
    .catch((err) => console.error(err));
  }, []);

  useEffect(()=> console.log(data), [data])

  return (
    <div className="flex flex-row">
      <section className="flex flex-col w-[25%] h-screen border px-10 py-5 border-r-2 border-gray-100 shadow-xl bg-white">
      <span className="p-input-icon-left">
          <i className="pi pi-search pl-2" />
          <InputText 
          className="pl-7 border outline-none w-full h-10 rounded-md"
          placeholder="search for city..." />
      </span>
      <div className="flex flex-col items-center border-gray-100 shadow-sm border-b-2 pb-8">
        <Image
          src={sunCloudImg}
          alt="My Image"
          width={200}
          height={200}
          // layout="responsive"
          // sizes="(min-width: 668px) 100vw, (min-width: 540px) 50vw, 320px"
        />
        <div className="text-[70px]"> 12°C </div>
        <div className="text-[#bababa]"> <span className="text-black"> Monday, </span> 16:00 </div>
      </div>
      <div className="pt-[30px]">
        <span className="flex flex-row justify-left items-center"> 
        <Image
          src={cloudImg}
          alt=""
          width={40}
          height={40}
          // layout="responsive"
          // sizes="(min-width: 668px) 100vw, (min-width: 540px) 50vw, 320px"
        />
          <text>Mostly Cloudy</text>
        </span>
        <span className="flex flex-row justify-left items-center"> 
        {/* #def4fc */}
        <Image
          src={rainyCloud}
          alt=""
          width={40}
          height={40}
          // layout="responsive"
          // sizes="(min-width: 668px) 100vw, (min-width: 540px) 50vw, 320px"
        />
          <text>Rain - 30%</text>
        </span>
      </div>
      <span className="relative mt-5 flex justify-center items-center bg-black rounded-lg"> 
        <Image
          src={cityImg}
          alt=""
          width={300}
          height={100}
          className="h-[100px] rounded-lg opacity-80"
        />
        <span className="absolute text-white font-extrabold"> Accra </span>
      </span>
      </section>
      <section className="w-[75%] px-[40px]">
        <div id="navbar" className="flex flex-row justify-between items-center px-4 mt-8 h-12 border-gray-100 shadow-sm border-b-2">
          <span className="flex flex-row justify-between w-[12%]">
            <button> Today </button>
            <button className="text-[#bababa]"> 5 days </button>
          </span>
          <span className="h-full flex flex-row items-center">
            <span className="bg-[#000S] rounded-full bg-black text-white w-9 flex justify-center items-center h-9"> °C </span>
            <span className="rounded-full w-9 flex justify-center items-center h-9"> °F </span>
          </span>
        </div>
        <div>
          <div> Description </div>
          <div className="mt-[40px] flex flex-col pt-[50px]">
            <span className="font-bold text-[20px] pl-6"> Highlights </span>
            <div className=" grid grid-cols-3 grid-rows-2 gap-y-4">
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Sunrise & Sunset </text>
                <span>
                  <text className="text-[30px]"> 6:30AM </text>
                </span>
                <span>
                  <text className="text-[30px]"> 6:00PM </text>
                </span>
              </div>
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Temperature </text>
                <text className="font-semibold text-[50px]"> 12°C </text>
                <text> Normal</text>
              </div>
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Min Temperature </text>
                <text className="font-semibold text-[50px]"> 10°C </text>
                <text> Normal</text>
              </div>
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Max Temperature </text>
                <text className="font-semibold text-[50px]"> 15°C </text>
                <text> Normal</text>
              </div>
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Humidity </text>
                <text className="font-semibold text-[50px]"> 12% </text>
                <text> Normal</text>
              </div>
              <div className="rounded-[10px] shadow-md hover:shadow-xl flex flex-col justify-center items-center border w-[250px] py-8 h-[220px]">
                <text className="text-[20px] text-[#bababa]"> Wind Status </text>
                <text className="font-semibold text-[50px]"> 7.70 <text className="text-[30px]"> km/h </text> </text>
                <text> Normal</text>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



export default Page;
