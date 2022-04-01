const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('Hello express!!');
});

app.get('/help', (req, res) => {
  res.send([{
    name: 'Ashirvad',
    age: 31,
  }]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us. Coming soon...</h1>');
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: `It's cloudy`,
    location: 'bangalore',
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
