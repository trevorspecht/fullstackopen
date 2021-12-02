// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]
// const content = process.argv[3]
// const important = process.argv[4]

// const url =
//   `mongodb+srv://fsouser:${password}@cluster0.fggg3.mongodb.net/notes-app?retryWrites=true&w=majority`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean
// })

// const Note = mongoose.model('note', noteSchema)

// if (process.argv.length == 3) {
//     Note.find({}).then(result => {
//         result.forEach(note => {
//             console.log(note)
//         })
//         mongoose.connection.close()
//     })
// } else {

//     const note = new Note({
//         content: content,
//         date: Date.now(),
//         important: important
//       })
      
//       note.save().then(result => {
//         console.log('note saved!: ', result.content, result.important)
//         mongoose.connection.close()
//       })
// }


