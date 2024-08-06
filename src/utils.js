const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyeWFuc2gwMDMiLCJhIjoiY2x5ZnU1ZTlwMDNpbTJpcG9kd2h6ZWc4ZCJ9.vIbHkQ9MPV22men4RnWjQA&limit=1'

    request({url: url,json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search. ',undefined) 
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e657c41dbcf2fab09409de61805bd167&query='+ latitude + ',' + longitude

    console.log("Requesting Weatherstack API with URL:", url);

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            console.log("Error connecting to weather service:", error);
            callback('Unable to connect to weather service!', undefined);
        } else {
            console.log("Weatherstack API response:", body);

            if (body.error) {
                console.log("Weatherstack API error:", body.error);
                callback('Unable to find location. Try another search.', undefined);
            } else {
                const current = body.current;
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.');
            }
        }
    });
}

module.exports = {
    geoCode: geoCode,
    forecast: forecast
}
