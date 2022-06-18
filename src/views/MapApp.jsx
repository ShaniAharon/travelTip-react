import React from 'react'
import {useLoadScript} from '@react-google-maps/api'
import {Map} from '../cmps/Map'
import {LocList} from '../cmps/LocList'
import {eventBus} from '../services/eventBusService'

export const MapApp = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

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
      </div>
    </section>
  )
}
