const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/75aabac507ca043f41df9f2255531ee2/' + latitude + ',' + longitude + '?units=si'
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to weather service.')
		} else if(body.error) {
			callback('Unable find location.')
		} else {
			callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature}°C. There is a ${body.currently.precipProbability * 100}% chance of rain.`)
		}
	})
}

module.exports = forecast