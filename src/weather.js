const request = require('request')

//last function for last leg
function getWeather(lat,lon,cb){
    //creating url
    const weatherPrefix = "https://api.openweathermap.org/data/2.5/weather"
    const weatherKey = "3fea43cfbe8afa30737ca8f05abb0738"
    const url = `${weatherPrefix}?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`

    //callback
    request.get(url,(err,response)=>{
        //if error, send back error and no data
        if(err) {
            cb("Error. COuld not fetch data",undefined)
        } else {
            //parse body, send back temp data
            const data = JSON.parse(response.body)
            cb (undefined,{temp:data.main.temp, real:data.main.feels_like})
        }
    })
}

module.exports = getWeather
