const https = require('https')
const url = 'https://api.darksky.net/forecast/75aabac507ca043f41df9f2255531ee2/40,-75?units=si'
let data = ''

const request = https.request(url, response => {
	response.on('data', chunk => {
		data = data + chunk.toString()
	})

	response.on('end', () => {
		console.log(JSON.parse(data))
	})
})

request.on('error', (error) => {
	console.log('An error: ', error)
})

request.end()