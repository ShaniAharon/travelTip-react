import axios from 'axios'

export const weatherService = {
    getWeather,
}

async function getWeather({ lat, lng }) {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    return res.data
}




