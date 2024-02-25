//requirements to run 
const express = require('express')
const makeMyTrip = require('./src/TripMaker')
const app = express()
const path = require('path')
//opening port
const port = 3000;
app.listen(port)
console.log("Starting server on Port 3000")

app.use(express.urlencoded({extended:true})); // this middleware is essential for express to parse data coming in from post requests
app.use(express.static(path.join(__dirname,'public'))) //this middleware tells express where to serve static assets from
app.set('views',path.join(__dirname,'views')) // this tells express where to look for templates when using res.render
app.set('view engine','ejs') // this tells express what tempalte engine to use eg. pug,hbs ejs etc.

//home page
app.get('/',(req,res)=>{
    //rendering index.ejs
     res.render('index')
})

//trip page
app.get('/trip',(req,res)=>{
    //gathering input from text box
    const address = req.query.txtInput
    //callback makemytrip
    makeMyTrip(address,(locError,locData)=>{
        //if error send error
        if(locError) {
            res.send({locError:locError})
        } else {
            //send data created
            res.send(locData)
        }
    })
})

/* Basic 404 response*/
app.get('/*',(req,res)=>{
    res.status(404)
    res.type('txt')
    res.write("Oops, this page does not exist")
    res.send()
})

