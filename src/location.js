const request = require('request')

//function to generate the coord of each location
function generateLocations(addrList,callback){
    //making url with api key
    const locPrefix = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const mapboxKey = "pk.eyJ1IjoibWFkaXNvbmtlbGwiLCJhIjoiY2xlNXdtM3BhMGI2MTN1dGN6ajlzNnA1YiJ9.gfQhYH6u-3vG8ftSOH0L4g"
    let arr = []
    //loop though each address
    for(let i=0; i<addrList.length; i++){
        //create url with the locations
        let url = `${locPrefix}${addrList[i]}.json?proximity=ip&access_token=${mapboxKey}`
        //make request to api
        request.get(url,(err,response)=>{
            if (err){
                //send back error if location is not found with no data
                callback("Error. Could not get location", undefined)
            } else {
                //parse the data, send it to array
                const data = JSON.parse(response.body).features[0]
                arr.push({idx:i, lat:data.center[1], lon:data.center[0], name:data.place_name})
                //sorting the addresses
                if(arr.length === addrList.length){
                    arr.sort((idx1,idx2)=>{
                        return idx1.idx-idx2.idx 
                    })
                    callback (arr, undefined)
                }
            }
        })
    }
}

module.exports = generateLocations