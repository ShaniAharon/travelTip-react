import {useMemo} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'

export const Map = () => {
  const center = useMemo(() => ({lat: 34, lng: -80}), [])
  //TODO: user click a loc open model to enter a name
  //Add it to the saved locs , put mark on it
  return (
    <GoogleMap
      onClick={({latLng}) => console.log(latLng.lat(), latLng.lng())}
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      <Marker position={center} />
    </GoogleMap>
  )
}
