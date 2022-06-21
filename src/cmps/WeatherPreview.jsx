import React, {useEffect, useState} from 'react'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'
import {weatherService} from '../services/weather.service'

export const WeatherPreview = ({pos}) => {
  const [weatherData, setWeatherData] = useState(null)

  //get the center as a prop from the map cmp
  useEffect(() => {
    const centerLoc = locService.getCenterLoc()
    weatherService.getWeather(centerLoc).then((res) => {
      setWeatherData(res)
    })
    const unsubscribeWeather = eventBus.on('centerWeather', (pos) => {
      weatherService.getWeather(pos).then((res) => {
        setWeatherData(res)
      })

      return () => {
        unsubscribeWeather()
      }
    })
  }, [pos])

  const prepareData = () => {
    const {weather, main, name} = weatherData
    const {temp, humidity} = main
    const {description} = weather[0]

    return [
      `Place Name: ${name}`,
      `Temp in celsius: ${temp} `,
      `Humidity: ${humidity}`,
      `Description: ${description}`,
    ]
  }

  if (!weatherData) return <div>Loading...</div>
  return (
    <section className="weather-preview pos-relative">
      <h1 className="u">Weather</h1>
      {/* <pre>{JSON.stringify([weather, main], 0, 4)}</pre> */}
      <ul className="clean-list weather-list pos-center">
        {prepareData().map((item) => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
