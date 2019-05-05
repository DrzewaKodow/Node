const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find(note => note.title === title)

	if (duplicateNote) {
		console.log(chalk.red.inverse('Note title already taken.'))
	} else {
		notes.push({
			title: title,
			body: body
		}) 
		saveNotes(notes)
		console.log(chalk.green.inverse('New note added.'))
	}
}

const removeNote = title => {
	const notes = loadNotes()
	const filteredNotes = notes.filter(note => note.title !== title)

	if (filteredNotes.length < notes.length) {
		saveNotes(filteredNotes)
		console.log(chalk.green.inverse('Note ' + title + ' removed.'))
	} else {
		console.log(chalk.red.inverse('Note ' + title + ' not found.'))
	}
}

const listNotes = () => {
	const notes = loadNotes()
	notes.length > 0 ? console.log(chalk.inverse('Your notes:')) : console.log('The notes list is empty.')
	notes.forEach((note, i)=> {
		console.log(i+1 + '. ' + note.title)
	})
}

const readNote = title => {
	const notes = loadNotes()
	const chosenNote = notes.find(note => note.title === title)

	if (chosenNote) {
		console.log(chalk.inverse(chosenNote.title))
		console.log(chosenNote.body)
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
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}