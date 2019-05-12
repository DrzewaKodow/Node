const request = require('request')
const url = 'https://api.darksky.net/forecast/75aabac507ca043f41df9f2255531ee2/52.229675,21.012230?units=si'

request({url: url, json: true}, (error, response) => {
	console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}°C. There is a ${response.body.currently.precipProbability * 100}% chance of rain.`)
})