const consoleError = '\x1b[31m'
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const place = [...process.argv].splice(2,process.argv.length).join(' ')

if (place) { 
	geocode(place, (error, {latitude, longitude, location}) => {
		if (error) {
			return console.log(consoleError, error)
		} 

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				console.log(consoleError, error)
			} else {
				console.log(location)
				console.log(forecastData)
			}
		})
	}) 
} else {
	console.log(consoleError, 'Please provide an adress.')
}