const request = require('postman-request');
const getUrl = require('./urlBuilder');

const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
// eslint-disable-next-line max-len
const apiKey = 'pk.eyJ1IjoiYXNoaXJ2YWQiLCJhIjoiY2wxZWd1c2liMDBzYzNpb2p2Yno0dWhieiJ9.Rc4FiB3ZdDG9_ZVXrdUTIQ';

const geocode = (address, callback) => {
  const endPoint = `${address}.json?`;
  const params = {
    'access_token': apiKey,
    'limit': '1',
  };
  const url = getUrl(baseUrl, params, endPoint);
  console.log('geocode url: ', url);
  request({url, json: true}, (error, {body}, {features}) => {
    if (error || body.error || features.length === 0) {
      callback('Unable to find location', null);
    } else {
      const coordinate = features[0].center;
      callback(undefined, {
        latitude: coordinate[0],
        longitude: coordinate[1],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
