const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geoCode, forecast } = require('./utils.js')

const app = express() 
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Suryansh Mishra'
    })
})

app.get('/about', (req, res) => {
    res.render('about' ,{
        title: 'About Me',
        name: 'Suryansh Mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help' ,{
        title: 'Help Page',
        name: 'Suryansh Mishra',
        helpText: 'This is the page help'
    })
})

// 
// Q) Goal: Wire up /weather
// 
// 1. Require geocode/forcast into app.js
// 2. use the address to geocode
// 3. Use the coordinates to get forcast 
// 4. Send back the real forcast and location

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address!'
        })
    } else {
        geoCode(req.query.address, (error, { latitude, longitude, location }) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })  
        })
    }
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Suryansh Mishra',
        errorMessage:''
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Suryansh Mishra',
        errorMessage:'Help articale not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})