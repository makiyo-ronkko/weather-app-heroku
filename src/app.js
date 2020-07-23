const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config: 
const publicDirectoryPath = path.join(__dirname, '../public'); //__dirname at src
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve:
// express matches index.html to root route
app.use(express.static(publicDirectoryPath));

// Routes: app.get
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Do you need a help?',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

// /weather?address=Helsinki
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {//default {}
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude,
            (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                });
            });
    });

    /* console.log(req.query)
    res.send({
        forecast: 'Partially cloudy',
        location: 'Espoo',
        address: req.query.address
    }); */
});

// /products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // return to stop execusion
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
    });
});

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});




// console.log(__dirname); // directory path
// console.log(path.join(__dirname, '../public'));

// object are sent as parsedJSON
/*
/* app.get('/', (req, res) => {
    res.send(`
    <h1>Weather</h1>
    `);
   });
   app.get('/help', (req, res) => {
    res.send([{
        name: 'Andrew',
        age: 27
    },
    {
        name: 'Sarah',
        age: 39
    }]);

    app.get('/about', (req, res) => {
    res.send(`
    <h1>About Us</h1>
    <p>Welcome!</p>
    `);
});
}); */