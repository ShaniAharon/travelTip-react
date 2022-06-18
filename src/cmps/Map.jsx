import {useEffect, useMemo, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {Modal} from '../cmps/Modal'
import {eventBus} from '../services/eventBusService'

export const Map = () => {
  // let center = useMemo(() => ({lat: 34, lng: -80}), [])
  const [pos, setPos] = useState(null)
  const [center, setCenter] = useState(null)
  //TODO: Make markers service to controll the markers ,
  // Connect between the marks and the locs, Also need to servive refresh
  //TODO: remove markers from the array when needed
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    //componentDidMount
    const unsubscribeFunc = eventBus.on('clickLoc', ({lat, lng}) => {
      setCenter({lat, lng})
    })

    setCenter({lat: 34, lng: -80})
    //componentWillUnmount
    return () => {
      unsubscribeFunc()
    }
  }, [])

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
