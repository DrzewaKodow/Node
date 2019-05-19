const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const resultMessage1 = document.querySelector('#result1')
const resultMessage2 = document.querySelector('#result2')

const fetchWeatherData = location => {
	const url = `http://localhost:3000/weather?address=${location}`

	resultMessage1.textContent = 'Loading...'
	resultMessage2.textContent = ''
	resultError.textContent = ''
	
	fetch(url).then(response => {
		response.json().then(data => {
			if (data.error) {
				resultMessage1.textContent = ''
				return resultError.textContent = data.error
			}
	
			resultMessage1.textContent = data.location
			resultMessage2.textContent = data.forecast
		})
	})
}

searchForm.addEventListener('submit', e => {
	e.preventDefault()
	fetchWeatherData(searchInput.value)
})