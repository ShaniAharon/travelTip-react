import {useEffect, useMemo, useRef, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {Modal} from '../cmps/Modal'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'

export const Map = () => {
  // let center = useMemo(() => ({lat: 34, lng: -80}), [])
  const [pos, setPos] = useState(null)
  const [center, setCenter] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    //componentDidMount
    const unsubscribeCenter = eventBus.on('clickLoc', ({lat, lng}) => {
      setCenter({lat, lng})
    })

    const unsubscribeSearch = eventBus.on('searchLoc', (loc) => {
      setCenter(loc)
      setMarkers((prevMarkers) => [...prevMarkers, loc])
    })

    const unsubscribeUserLoc = eventBus.on('toUserLoc', () => {
      navigator?.geolocation.getCurrentPosition(
        ({coords: {latitude: lat, longitude: lng}}) => {
          const pos = {lat, lng}
          setCenter(pos)
        }
      )
    })

    const unsubscribeMark = eventBus.on('putMark', (loc) => {
      setMarkers((prevMarkers) => [...prevMarkers, loc])
    })

    const unsubscribeRemoveMark = eventBus.on('removeMark', (locId) => {
      //TODO: fix bug when you delete all the locs
      setMarkers((prevMarkers) => prevMarkers.filter(({_id}) => _id !== locId))
    })

    setCenter({lat: 34, lng: -80})
    //componentWillUnmount
    return () => {
      unsubscribeCenter()
      unsubscribeMark()
      unsubscribeRemoveMark()
      unsubscribeUserLoc()
      unsubscribeSearch()
    }
  }, [])

  useEffect(() => {
    loadLocs()
  }, [])

  const loadLocs = async () => {
    const locs = await locService.getLocs()
    setMarkers(locs)
  }

  const handleClick = ({latLng}) => {
    const pos = {lat: latLng.lat(), lng: latLng.lng()}
    setPos(pos)
  }

  if (!markers) return <div>Loading...</div>

  return (
    <GoogleMap
      onClick={handleClick}
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      {/* <Marker position={center} /> */}
      {markers.map(({name, lat, lng}, idx) => (
        <Marker key={idx} title={name} position={{lat, lng}} />
      ))}
      {pos && <Modal pos={pos} />}
    </GoogleMap>
  )
}
