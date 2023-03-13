import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'

dotenv.config()
let url = "https://api.opencagedata.com/geocode/v1/json?key="
let options = {
  provider: 'opencage',
  httpAdapter: 'https',
  apiKey: process.env.apiKey,
  formatter: 'json'
};

let geocoder = NodeGeocoder(options);
export async function getPlace(coords) {
  return await geocoder.reverse(coords)
  .then(res => res[0])
  .then(place => {
    return {
      country: place.country,
      state: place.state,
      city: place.city
    }
  })
}


// exports.getPlace = getPlace