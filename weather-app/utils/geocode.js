const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJ1c3MiLCJhIjoiY2p2bDRyeDVuMDl4bjRhdm4yMzVpcG1tNyJ9.GurAZvXmMsL3FPymXVBeag&limit=1'
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to geolocation service.')
		} else if (!body.features[0]) {
			callback('Unable to find location.')
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name 
			})
		}
	})
}

module.exports = geocode