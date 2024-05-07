const express = require('express')
const PORT = 3000
const app = express()
const path = require('path')
const fs = require('fs/promises')


// console.log()

app.use(express.static('public'))
app.use(express.json())

//getting home page index.html
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '..', 'index.html'))
})


//getting notes page from notes.html
app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '..', 'notes.html'))
})

//getting notes from the DB
app.get('/api/notes', async (req, res)=>{
   res.sendFile(path.join(__dirname, '..', '..', '..', 'db/db.json'))
})

//adding notes to the DB
app.post('/api/notes', (req, res)=>{
   const  notes = fs.readFile(path.join(__dirname, '..', '..', '..', 'db/db.json')) || []
    
   notes.push(req.body)
   fs.writeFile(__dirname, '..', '..', '..', 'db/db.json', JSON.stringify(notes))
})

//BONUS- attempting to delte a specific note
app.delete('/api/notes/:id', (req, res)=>{

})

app.listen(PORT, ()=>{
    console.clear()
    console.log('Listening on port: 3000')
})