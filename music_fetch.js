import fetch from 'node-fetch'
import convert from "xml-to-json-promise"
import {getPlace}  from './geolocation.js'
import {parseString} from "xml2js"


let coords = {lat: 12.963928, lon: 77.714779}

let {city, state, country} = await getPlace(coords)
let data;

let getSongs = async (place) => {
  let url = ("http://musicbrainz.org/ws/2/annotation/?query=")
  url = url + `text:${place}`
  return await fetch(url)
    .then(res => res.text())
    .then(res => {
      parseString(res, (err, result) => {
        data = result['metadata']['annotation-list'][0]['annotation']
        // console.log(result)
      })
    })
}

let allSongs = [];
let temp = [];

await getSongs(city)
if (data) temp = [...allSongs, ...data]
allSongs = temp
// console.log(data)

await getSongs(state)
if (data) temp = [...allSongs, ...data]
allSongs = temp
// console.log(data)

await getSongs(country)
if (data) temp = [...allSongs, ...data]
allSongs = temp

console.log(allSongs)

