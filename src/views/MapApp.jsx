import React, {useEffect, useRef, useState} from 'react'
import {useLoadScript} from '@react-google-maps/api'
import {Map} from '../cmps/Map'
import {WeatherPreview} from '../cmps/WeatherPreview'
import {LocList} from '../cmps/LocList'
import {eventBus} from '../services/eventBusService'
import {geoService} from '../services/geocoding.service'
import {locService} from '../services/loc.service'

export const MapApp = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  //TODO: make style responsive

  //Create a ‘copy link’ button that saves a link to the clipboard.
  //Use query string params

  const copyURLToClipboard = () => {
    const {lat, lng} = locService.getCenterLoc()
    //fix a bug when we already got qs params
    const idx = window.location.href.indexOf('?')
    const href =
      idx < 0 ? window.location.href : window.location.href.substring(0, idx)
    const modfiyURL = href + `?lat=${lat}&lng=${lng}` //http://localhost:3000/?lat=3.14&lng=1.63

    //copy the page url to clipboard
    navigator.clipboard.writeText(modfiyURL)
  }

  //Using Proxy() is more performant than using Object.fromEntries() and better supported
  // const params = new Proxy(new URLSearchParams(window.location.search), {
  //   get: (searchParams, prop) => searchParams.get(prop),
  // });
  // // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  // let value = params.some_key; // "some_value"

  const extractParamsData = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    })
    const {lat, lng} = params
    const centerPos = {lat: +lat, lng: +lng}
    return centerPos
  }

  const [search, setSearch] = useState('')

  const searchLoc = ({target}) => {
    setSearch(target.value)
  }

  const findLoc = async () => {
    if (!search) return
    const {results} = await geoService.getPos(search)
    const searchPos = results[0].geometry.location
    const loc = {...searchPos, name: search}
    await locService.saveLoc(loc)
    eventBus.emit('searchLoc', loc)
    setSearch('')
  }

  const toMyLoc = () => {
    copyURLToClipboard()
    eventBus.emit('toUserLoc', 'test')
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <section className="map-app-container">
      <Map extractParamsData={extractParamsData} />
      <div>
        <LocList />
        <button onClick={toMyLoc} className="btn  btn-primary btn-location">
          My location
        </button>
        {/* put it in a cmp later */}
        <div className="search-container">
          <input
            placeholder="Enter Your Destination"
            type="text"
            onChange={searchLoc}
            value={search}
            className=""
          />
          <button onClick={findLoc} className="btn  btn-success">
            find Location
          </button>
        </div>
        <button
          className=" btn-clip btn btn-warning"
          onClick={copyURLToClipboard}
        >
          Copy to clipboard
        </button>
        <WeatherPreview />
      </div>
    </section>
  )
}
