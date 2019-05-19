const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

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
		title: 'Weather App',
		name: 'Pruss'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Pruss'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		text: 'Some helpful text',
		name: 'Pruss'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Address missing in a query.'
		})
	}


	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({error})
		} 

		forecast(latitude, longitude, (error, forecast) => {
			if (error) {
				return res.send({error})
			} 

			res.send({
				location,
				forecast
			})
		})
	}) 
})

app.get('/help/*', (req, res) => {
	res.render('help', {
		title: 'Help page not found',
		text: 'There is no help page at this address',
		name: 'Pruss'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Page not found',
		text: 'Could not find page at given address',
		name: 'Pruss'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})
