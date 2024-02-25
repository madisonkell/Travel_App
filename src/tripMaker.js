const request = require('request')
const getWeather = require('./weather')
const generateLocations = require('./location')
const generateTrip = require('./Trip')

//function that calls all of the other functions to create a completed trip
function makeMyTrip(addr, callback){
  //split the adderessed by comma
  addr = addr.split(",")
  //if they do not give a valid input 
  if(!addr || addr.length < 2){
    let error = "WRONG"
    //send error
    callback(error, undefined)
  } else {
    //generate the coords
    generateLocations(addr, (trip, err)=>{
      if(err){
        callback("error", undefined)
      } else {
        //generate the legs
        generateTrip(trip, (trip, err)=>{
          if(err) {
            callback("error", undefined)
          } else {
            //get the weather
            getWeather(trip.legs[addr.length -2].stop.lat, trip.legs[addr.length -2].stop.lat, (err, weather)=>{
              if(err) {
                callback("error", undefined)
              } else {
                trip.weather = weather
                //send back the completed trip
                callback(undefined, trip)
              }
            })
          }
        })
      }
    })
  }
}

module.exports = makeMyTrip