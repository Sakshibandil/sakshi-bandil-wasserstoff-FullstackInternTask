import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context'
import clear from '../assets/images/clear1.jpg'
import Fog from '../assets/images/fog.png'
import Snow from '../assets/images/snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'
import image1 from '../assets/images/bg1.jpg'
import rain1 from '../assets/images/rain1.jpg'

const BackgroundLayout = () => {

  const { weather } = useStateContext()
  const [image, setImage] = useState(clear)

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions
      if (imageString.toLowerCase().includes('clear')) {
        setImage(clear)
      } else if (imageString.toLowerCase().includes('cloud')) {
        setImage(image1)
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')) {
        setImage(rain1)
      } else if (imageString.toLowerCase().includes('snow')) {
        setImage(Snow)
      } else if (imageString.toLowerCase().includes('fog')) {
        setImage(Fog)
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('storm')) {
        setImage(Stormy)
      }
    }
  }, [weather])

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default BackgroundLayout