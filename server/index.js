import path from 'path'

import express from 'express'
import markdownRouter from 'express-markdown-router'
import consolidate from 'consolidate'

const app = express()

app.set('port', process.env.PORT || 5000)

// Markdown middleware
app.use(markdownRouter(path.join(__dirname, 'views')))

// Static file server
app.use(express.static(path.join(__dirname, 'public')))
app.use('/scripts',
  express.static(path.join(__dirname, '/node_modules/babel-polyfill/dist/')))

// Lodash templates
app.engine('html', consolidate.lodash)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/views'))

// Index
app.get('/', (request, response) => {
  response.render('index')
})

// Watch page
app.get('/play', (request, response) => {
  response.render('play')
})


// example.json
app.get('/example', (request, response) => {
  response.set('Content-Type', 'application/json')
  response.download(path.join('public', 'example.json'))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
