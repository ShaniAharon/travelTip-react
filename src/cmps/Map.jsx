import {useMemo, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {Modal} from '../cmps/Modal'

export const Map = () => {
  const center = useMemo(() => ({lat: 34, lng: -80}), [])
  const [loc, setLoc] = useState(null)

  const handleClick = ({latLng}) => {
    const pos = {lat: latLng.lat(), lng: latLng.lng()}
    setLoc(pos)
  }
  //TODO: user click a loc open model to enter a name
  //Add it to the saved locs , put mark on it
  return (
    // <section className="">
    <GoogleMap
      onClick={handleClick}
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      <Marker position={center} />
      <Modal loc={loc} />
    </GoogleMap>
  )
}
