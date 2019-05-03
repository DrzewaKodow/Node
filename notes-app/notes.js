const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => "Your notes..."

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNotes = notes.filter(note => note.title === title)

	if (duplicateNotes.length === 0) {
		notes.push({
			title: title,
			body: body
		}) 
		saveNotes(notes)
		console.log(chalk.green.inverse('New note added.'))
	} else {
		console.log(chalk.red.inverse('Note title already taken.'))
	}
}

const removeNote = (title) => {
	const notes = loadNotes()
	const filteredNotes = notes.filter(note => note.title !== title)

	if (filteredNotes.length < notes.length) {
		saveNotes(filteredNotes)
		console.log(chalk.green.inverse('Note ' + title + ' removed.'))
	} else {
		console.log(chalk.red.inverse('Note ' + title + ' not found.'))
	}
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

const saveNotes = (notes) => {
		JSONdata = JSON.stringify(notes)
		fs.writeFileSync('notes.json', JSONdata)
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
}