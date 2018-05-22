'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))


let game = null


app.get('/', (req, res) => {

    res.send(`<!DOCTYPE html>
    <html lang="en">
    

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="vendor/bootstrap/4.1.0/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/main.css">
        <title>Hangman-app-server</title>
    </head>
    
    <body>
        <main class='container'>
            <section>
                <article class="p-3 mb-2 bg-secondary text-white">
                    <h1>HANGMAN GAME</h1>
                    <p>Insert the world wants to be guessed</p>
                </article>
                <article>
                    <form action="/add-word" method='post'>
                        <input type="text" name="word" placeholder="enter world">
                        <button type='submit'>Accept</button>
                    </form>
                </article>
            </section>
    
            <section class="p-3 mb-2 bg-secondary text-white">
                <article>
                    <h1>HANGMAN</h1>
                    <p>Welcome, insert the letter and try!</p>
                    ${game? `<p>${game._guessed.join(' ')}</p> <p>Status: ${game._status}</p> <p>Attemps: ${game._attempts}</p>`: ''}
                    
                </article>
                <article>
                    <form action="insert-try" method='post'>
                        <input type="text" name="letter" placeholder="insert letter o word" autofocus>
                        <button type='submit'>Try</button>
                    </form>
                </article>
            </section>
        </main>
    
        <script src="vendor/jquery/3.3.1/jquery-3.3.1.min.js"></script>
        <script src="vendor/popper/1.14.3/popper.min.js"></script>
        <script src="vendor/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    
    </body>
    
    </html>
    `)
})

app.post('/add-word', (req, res) => {
    const { body: { word } } = req
    
        game = new Hangman(word)
    
    res.redirect('/')
})

app.post('/insert-try', (req, res) => {
    const { body: {letter} } = req
    
    game.try(letter)

    res.redirect('/')
})

const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})








/*const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    const todos = logic.listTodos()
    const dones = logic.listDones()
    const { query: { error } } = req

    res.render('index', { todos, dones, error, path: '/' })
})

app.post('/add-task', (req, res) => {
    const { body: { text } } = req

    try {
        logic.addTask(text)
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post('/mark-task-done', (req, res) => {
    const { body: { id } } = req

    try {
        logic.markTaskDone(parseInt(id))
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.post('/remove-task', (req, res) => {
    const { body: { id } } = req

    try {
        logic.removeTask(parseInt(id))
    } catch ({ message }) {
        res.redirect(`/?error=${message}`)
    }

    res.redirect('/')
})

app.get('/about', (req, res) => {
    res.render('about', { path: '/about' })
})

const port = process.argv[2] || 3000

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('stopping server')

    process.exit()
})
*/