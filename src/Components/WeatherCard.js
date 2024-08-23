import React, { useEffect, useState } from 'react'
import { useDate } from '../Utils/useDate'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import wind from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature = 0, 
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun)
  const { time } = useDate()

  const [unit, setUnit] = useState('C') 
  const [currentTemp, setCurrentTemp] = useState(temperature)

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(wind)
      }
    }
  }, [iconString])

  useEffect(() => {
    setCurrentTemp(temperature)
  }, [temperature])

  const toggleUnit = () => {
    if (typeof temperature === 'number' && !isNaN(temperature)) {
      if (unit === 'C') {
        setCurrentTemp((temperature * 9/5) + 32)
        setUnit('F')
      } else {
        setCurrentTemp(temperature)
        setUnit('C')
      }
    } else {
      setCurrentTemp('N/A')  
    }
  }

  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='flex w-full justify-center items-center gap-4 mt-5 mb-4'>
        <img src={icon} alt="weather_icon" />
        <div className='flex items-center'>
          <p className='font-bold text-5xl flex justify-center items-center'>
            {Math.round(currentTemp)} &deg;{unit}
          </p>
          <button
            onClick={toggleUnit}
            className='ml-5  p-2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'>
            <span className='mr-2'>{unit === 'C' ? '°F' : '°C'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h7m0 0l-3-3m3 3l-3 3m6 4h-7m0 0l3 3m-3-3l3-3M4 9l4-4m0 0l4 4m-4-4v6m0 4v6m0 0H7m3 0h3" />
            </svg>
          </button>
        </div>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>
          Wind Speed <p className='font-normal'>{windspeed} km/h</p>
        </p>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>
          Humidity <p className='font-normal'>{humidity} gm/m&#179;</p>
        </p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        <p className='font-semibold text-lg'>Heat Index</p>
        <p className='text-lg'>{heatIndex ? heatIndex : 'N/A'}</p>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {conditions}
      </div>
    </div>
  )
}

export default WeatherCard
