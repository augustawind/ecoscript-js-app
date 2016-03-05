import path from 'path'

import express from 'express'
import markedejs from 'markedejs'

const app = express()

app.set('port', process.env.PORT || 5000)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/scripts',
  express.static(path.join(__dirname, '/node_modules/babel-polyfill/dist/')))

app.engine('md', markedejs.__express)
app.set('view engine', 'md')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (request, response) => {
  response.render('index')
})

app.get('/guide', (request, response) => {
  response.render('guide')
})

app.get('/example', (request, response) => {
  response.download(path.join('public', 'example.json'))
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
