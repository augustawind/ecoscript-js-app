import path from 'path'

import express from 'express'
import jade from 'jade'
import multer from 'multer'

const app = express()

app.set('port', process.env.PORT || 5000)

// Static file server
app.use(express.static(path.join(__dirname, 'public')))
app.use('/scripts',
  express.static(path.join(__dirname, '/node_modules/babel-polyfill/dist/')))

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (request, response) => {
  response.render('index')
})

app.get('/play', (request, response) => {
  response.render('play')
})

app.get('/example', (request, response) => {
  response.set('Content-Type', 'text/yaml')
  response.download(path.join('public', 'example.yml'))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
