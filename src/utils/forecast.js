const request = require('postman-request');
const getUrl = require('./urlBuilder');

const baseUrl = 'http://api.weatherstack.com/';
const weatherApiKey = '9c1172d3baa179874cecceb4f1fe1493';

const forecast = ({latitude, longitude}, callback) => {
  const params = {
    'access_key': weatherApiKey,
    'units': 'm',
    'query': `${latitude},${longitude}`,
  };
  const url = getUrl(baseUrl, params, 'current?');
  console.log('weather url: ', url);
  request({url, json: true}, (error, {body}, {current}) => {
    if (error || body.error) {
      callback('Unable to detect weather', undefined);
    } else {
      callback(undefined, {
        description: current.weather_descriptions[0],
        temperature: current.temperature,
        feelsLike: current.feelslike,
      });
    }
  });
};

module.exports = forecast;
