const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3VyeWFuc2gwMDMiLCJhIjoiY2x5ZnU1ZTlwMDNpbTJpcG9kd2h6ZWc4ZCJ9.vIbHkQ9MPV22men4RnWjQA&limit=1'

    request({url: url,json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search. ',undefined) 
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
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
                callback(undefined, 'The weather here is ' + current.weather_descriptions[0] + '. And the Temperature here is ' + current.temperature + ' degrees, but we are feels like ' + current.feelslike + ' degrees, and the humidity here is ' + current.humidity + '.');
            }
        }
    });
}

module.exports = {
    geoCode: geoCode,
    forecast: forecast
}
