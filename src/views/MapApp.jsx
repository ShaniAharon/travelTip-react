import React, {useState} from 'react'
import {useLoadScript} from '@react-google-maps/api'
import {Map} from '../cmps/Map'
import {LocList} from '../cmps/LocList'
import {eventBus} from '../services/eventBusService'
import {geoService} from '../services/geocoding.service'
import {locService} from '../services/loc.service'

export const MapApp = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  //TODO: Create a ‘copy link’ button that saves a link to the clipboard.
  //TODO: Use query string params
  const [search, setSearch] = useState('')

  const searchLoc = ({target}) => {
    setSearch(target.value)
  }

  const findLoc = async () => {
    if (!search) return
    const {results} = await geoService.getPos(search)
    const searchPos = results[0].geometry.location
    const loc = {...searchPos, name: search}
    console.log('loc seearch', loc) //results[0].geometry.location
    await locService.saveLoc(loc)
    eventBus.emit('searchLoc', loc)
    setSearch('')
  }

  const toMyLoc = () => {
    eventBus.emit('toUserLoc', 'test')
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <section className="map-app-container">
      <Map />
      <div>
        <LocList />
        <button
          onClick={toMyLoc}
          className="btn pos-center btn-primary btn-location"
        >
          My location
        </button>
        {/* put it in a cmp later */}
        <div className="search-container">
          <input type="text" onChange={searchLoc} value={search} className="" />
          <button onClick={findLoc} className="btn  btn-success btn-location">
            find Location
          </button>
        </div>
      </div>
    </section>
  )
}
