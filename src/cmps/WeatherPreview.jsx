import React, {useEffect, useState} from 'react'
import {useForm} from '../hooks/useForm'
import {locService} from '../services/loc.service'
// import {eventBus} from '../services/eventBusService'
import {weatherService} from '../services/weather.service'

export const WeatherPreview = ({pos}) => {
  // const [isShow, setShow] = useState(false)

  //get the center as a prop from the map cmp
  useEffect(() => {
    const centerLoc = locService.getCenterLoc()
    weatherService.getWeather(centerLoc).then((res) => console.log(res))
  }, [pos])

  // if (!pos) return <div>Loading...</div>

  return (
    <section className="weather-preview">
      <h1>Weather</h1>
    </section>
  )
}
