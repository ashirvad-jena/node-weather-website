const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ashirvad',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'All about us',
    name: 'Ashirvad',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is an example message',
  });
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
