import express from 'express'
import handlebars from 'express-handlebars'

const app = express()

app.set('port', process.env.PORT || 5000)

app.use(express.static(__dirname + '/public'))
app.use('/scripts',
  express.static(__dirname + '/node_modules/babel-polyfill/dist/'))

app.engine('html', handlebars({ extname: 'html' }))
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get('/', (request, response) => {
  response.render('index')
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
