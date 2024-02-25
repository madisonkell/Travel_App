const btnSubmit  = document.querySelector('#btnSubmit')
const txtInput = document.querySelector("#txtInput")
const tripResult = document.getElementById("tripResult")

//converting meters to miles
function convertDistance(distance){
    return (distance/1609.344).toFixed(2) + " miles"
}

//converting to correct time format
function convertTime(duration){
    let output = ""
    let sec = Math.floor(duration) % 60
    let min = Math.floor(duration/60) % 60
    let hr = Math.floor(duration / 3600)

    if(hr > 0){
        output += `${hr} hours `
    }
    if(min > 0){
        output += `${min} minutes `
    }
    if(sec > 0){
        output += `${sec} seconds`
    }

    return output
}


//listening for the button click
btnSubmit.addEventListener("click",(e)=>{
    //stops page from reloading 
    e.preventDefault()
    //make GET request to app.js
    fetch('/trip/?txtInput='+txtInput.value)
    .then((response)=>response.json())
    .then((tripData)=>{
        if(tripData.locError){
            //setting error if no location found or not enough inputs
            tripResult.innerHTML = "WRONG"
        } else {
            let arr = []
            //loop through all legs
            for(let i=0; i<tripData.legs.length; i++){
                //add to leg to the array 
                arr.push(
                `<li> <p>Start: ${tripData.legs[i].start.name}  </p>
                <p>Stop: ${tripData.legs[i].stop.name}  </p>
                <p>Distance: ${convertDistance(tripData.legs[i].distance)} </p>
                <p>Time: ${convertTime(tripData.legs[i].duration)} </p></li>`
                )
            }
            //adding results to page (without refreshing)
            tripResult.innerHTML =
            `
            <h2>Your Trip Summary </h2>
            <p>Total Distance: ${convertDistance(tripData.distance)} </p>
            <p>Total Time: ${convertTime(tripData.duration)}</p>
            <h3>Summary of Stops</h3>
            <ol>${arr.join(" ")}</ol>
            <h3>It's currently ${tripData.weather.temp} degrees in ${tripData.legs[tripData.legs.length - 1].stop.name}. It feels like ${tripData.weather.real} degrees.</h3>
            `
        }
    })
})


