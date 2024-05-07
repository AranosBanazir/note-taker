const express = require('express')
const PORT = 3000
const app = express()
const path = require('path')
const fs = require('fs/promises')
const { get } = require('http')
const dbLocation = path.join(__dirname, '..', '..', '..', 'db/db.json')
const usedIDs = []


function getRandomNum(){
    return Math.floor(Math.random() * 100000)
}

//get used IDs
async function getID(){
    const savedNotes = await fs.readFile(dbLocation, 'utf8') || '[]'
    const notes = JSON.parse(savedNotes)
    let rndN  = getRandomNum()
    notes.forEach(note => {
        if (!usedIDs.includes(note.id)){
            usedIDs.push(note.id)
        }
    })

    while (usedIDs.includes(rndN)){
        rndN = getRandomNum()
    }

    return rndN
}


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
   res.sendFile(dbLocation)
})

//adding notes to the DB
app.post('/api/notes', async (req, res)=>{
   const savedNotes = await fs.readFile(dbLocation, 'utf8') || '[]'
   const msgBody = req.body
   const notes = JSON.parse(savedNotes)
   msgBody.id = await getID()
   notes.push(msgBody)
   
   
   
    await fs.writeFile(dbLocation, JSON.stringify(notes))
    res.end()
})

//BONUS- attempting to delte a specific note
app.delete('/api/notes/:id', (req, res)=>{

})

app.listen(PORT, ()=>{
    console.clear()
    console.log('Listening on port: 3000')
})