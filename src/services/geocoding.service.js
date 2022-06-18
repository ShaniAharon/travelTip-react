import axios from 'axios'

export const geoService = {
    getPos,
}

//https://maps.googleapis.com/maps/api/geocode/json?address=Washington&key=YOUR_API_KEY

async function getPos(placeName) {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
    return res.data
}




