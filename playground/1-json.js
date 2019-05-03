const fs = require('fs')

let dataJSON = fs.readFileSync('1-json.json').toString()
const data = JSON.parse(dataJSON)

data.name = 'Piotr'
data.age = 34

dataJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', dataJSON)