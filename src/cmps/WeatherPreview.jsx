import React, {useEffect, useState} from 'react'
import {useForm} from '../hooks/useForm'
import {locService} from '../services/loc.service'
// import {eventBus} from '../services/eventBusService'
import {weatherService} from '../services/weather.service'

export const WeatherPreview = ({pos}) => {
  const [weatherData, setWeatherData] = useState(null)

  //get the center as a prop from the map cmp
  useEffect(() => {
    const centerLoc = locService.getCenterLoc()
    weatherService.getWeather(centerLoc).then((res) => {
      console.log(res)
      setWeatherData(res)
    })
  }, [pos])

  const prepareData = () => {
    const {weather, main} = weatherData
    const {temp, humidity} = main
    const {description} = weather[0]
    // const mains = Object.entries(main).map((item) => (
    //   <li key={Math.random()}>{item}</li>
    // ))
    console.log('[temp, humidity, description]', [temp, humidity, description])
    return [
      `Temp: ${temp} `,
      `Humidity: ${humidity}`,
      `Description: ${description}`,
    ]
  }

  if (!weatherData) return <div>Loading...</div>
  return (
    <section className="weather-preview">
      <h1>Weather</h1>
      {/* <pre>{JSON.stringify([weather, main], 0, 4)}</pre> */}
      <ul className="clean-list">
        {prepareData().map((item) => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
