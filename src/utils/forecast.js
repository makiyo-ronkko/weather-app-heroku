const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8bffad93ce311b3961cbc0d171dc48d5&query=' + latitude + ',' + longitude + '&units=m';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} in ${body.location.name}. Current temperature is ${body.current.temperature} but it feels like at ${body.current.feelslike}.`);
        }
    });
};

module.exports = forecast;