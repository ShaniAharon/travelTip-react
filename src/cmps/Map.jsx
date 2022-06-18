import {useMemo, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {Modal} from '../cmps/Modal'

export const Map = () => {
  const center = useMemo(() => ({lat: 34, lng: -80}), [])
  const [pos, setPos] = useState(null)
  const [markers, setMarkers] = useState([])

  const handleClick = ({latLng}) => {
    const pos = {lat: latLng.lat(), lng: latLng.lng()}
    setPos(pos)
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        title: 'The marker`s title will appear as a tooltip.',
        name: 'test',
        position: {lat: pos.lat, lng: pos.lng},
      },
    ])
  }
  //TODO: user click a loc open model to enter a name
  //Add it to the saved locs , put mark on it
  return (
    <GoogleMap
      onClick={handleClick}
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      <Marker position={center} />
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          title={marker.title}
          name={marker.name}
          position={marker.position}
        />
      ))}
      {pos && <Modal pos={pos} />}
    </GoogleMap>
  )
}
