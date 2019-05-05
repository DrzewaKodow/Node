const yargs = require('yargs')
const notes = require('./notes.js')

//Customize Yargs version
yargs.version('1.0.1')

//add command
yargs.command({
	command: 'add',
	describe: 'Adding a new note',
	builder: {
		title: {
			describe: 'Note title',
			require: true,
			type: String
		},
		body: {
			describe: 'Note body',
			require: true,
			type: String
		}
	},
	handler: argv => notes.addNote(argv.title, argv.body)
})

//remove command
yargs.command({
	command: 'remove',
	describe: 'Removing a note',
	builder: {
		title: {
			describe: 'Note title',
			require: true,
			type: String
		}
	},
	handler: argv => notes.removeNote(argv.title)
})

//list command
yargs.command({
	command: 'list',
	describe: 'Listing all notes',
	handler: () => notes.listNotes()
})

//read command
yargs.command({
	command: 'read',
	describe: 'Reading a note',
	builder: {
		title: {
			describe: 'Note title',
			require: true,
			type: String
		}
	},
	handler: argv => notes.readNote(argv.title)
})

yargs.parse();