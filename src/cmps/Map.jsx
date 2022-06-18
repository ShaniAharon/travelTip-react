import {useEffect, useMemo, useRef, useState} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import {Modal} from '../cmps/Modal'
import {locService} from '../services/loc.service'
import {eventBus} from '../services/eventBusService'
import {geoService} from '../services/geocoding.service'

export const Map = () => {
  // let center = useMemo(() => ({lat: 34, lng: -80}), [])
  const [pos, setPos] = useState(null)
  const [center, setCenter] = useState(null)
  const [markers, setMarkers] = useState([])
  const searchInput = useRef('')

  useEffect(() => {
    //componentDidMount
    const unsubscribeCenter = eventBus.on('clickLoc', ({lat, lng}) => {
      setCenter({lat, lng})
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
    }
  }, [])

  useEffect(() => {
    loadLocs()
  }, [])

  const loadLocs = async () => {
    const locs = await locService.getLocs()
    const {results} = await geoService.getPos('Washington')
    console.log('res', results[0].geometry.location) //results[0].geometry.location
    setMarkers(locs)
  }

  const searchLoc = () => {}

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
