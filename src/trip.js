const request = require('request')

//takes locations and generates each leg of the trip (as well as duration and distance)
function generateTrip(locations, callback){
  //creating url with api key 
  const locPrefix = "https://api.mapbox.com/directions/v5/mapbox/driving/"
  const mapboxKey = "pk.eyJ1IjoibWFkaXNvbmtlbGwiLCJhIjoiY2xlNXdtM3BhMGI2MTN1dGN6ajlzNnA1YiJ9.gfQhYH6u-3vG8ftSOH0L4g"
  let locURL = ""

  //looping through all locations
  for(let i=0; i<locations.length; i++){
    //adding coords to url
    locURL += locations[i].lon + "," + locations[i].lat 
    //adding semi colon between coords
    if(i !== locations.length -1){
      locURL += ";"
    }
  }
  
  //creating the url
  let url = `${locPrefix}${locURL}?access_token=${mapboxKey}`
 
  //requesting url 
  request.get(url,(err,response)=>{
    if (err){
        //sending error if location is not found with no data
        callback("Error. Could not get location", undefined)
    } else {
      //send pack parses data
      const data = JSON.parse(response.body).routes[0]
      //adding duration, distance, and legs to trip
      let trip = {
        duration:data.duration,
        distance:data.distance,
        legs: []
      }
      //for each location, add the leg info
      for(let i=0; i<locations.length -1 ; i++){
        let leg = {}
        leg.start = locations[i]
        leg.stop = locations[i+1]
        leg.distance = data.legs[i].distance
        leg.duration = data.legs[i].duration
        leg.summary = data.legs[i].summary
        trip.legs.push(leg)
      }
      //send the trip 
      callback(trip,undefined)
    }
  })
}

module.exports = generateTrip