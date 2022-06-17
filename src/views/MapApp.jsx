import React from 'react'
import {useLoadScript} from '@react-google-maps/api'
import {Map} from '../cmps/Map'
import {LocList} from '../cmps/LocList'

export const MapApp = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if (!isLoaded) return <div>Loading...</div>
  return (
    <section className="map-app-container">
      <Map />
      <LocList />
    </section>
  )
}
