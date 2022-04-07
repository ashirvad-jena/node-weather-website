const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
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
    title: 'Help',
    name: 'Ashirvad J',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'address must be provided',
    });
  }
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(data, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        address,
        forecast: data.description,
        temperature: data.temperature,
        feelsLike: data.feelsLike,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error404', {
    message: 'Help article not found',
    name: 'Ashirvad',
  });
});

app.get('*', (req, res) => {
  res.render('error404', {
    message: 'My 404 page',
    name: 'Ashirvad',
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
