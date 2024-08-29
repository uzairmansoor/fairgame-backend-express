const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const history = require('connect-history-api-fallback')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './config/dev.env'
    })
} else {
    require('dotenv').config({
        path: './config/prod.env'
    })
}

const userRouter = require('./routes/user')
const bookingRouter = require('./routes/booking')
const groupRouter = require('./routes/group-member')
const configRouter = require('./routes/config')
const webhookRouter = require('./routes/webhook')

const API_VERSION = 'v1'
const API_URL_PREFIX = '/api'
const API_PREFIX = `${API_URL_PREFIX}/${API_VERSION}`

const app = express()
app.disable('x-powered-by')
app.use(cors())

app.enable('trust proxy')

const currentDateUTC = moment.utc().format('DD_MM_YYYY')

const accessLogStream = fs.createWriteStream(path.join(__dirname, `../logs/access_${currentDateUTC}.log`), { flags: 'a' })
const logFormat = ':date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms'
app.use(morgan(logFormat, { stream: accessLogStream }))

const publicRoot = './dist'
app.use(history())
app.use(express.static(publicRoot))
app.use(history())

app.use(express.json())

app.use(`${API_PREFIX}/users`, userRouter)
app.use(`${API_PREFIX}/bookings`, bookingRouter)
app.use(`${API_PREFIX}/groups`, groupRouter)
app.use(`${API_PREFIX}/config`, configRouter)
app.use(`${API_PREFIX}/webhooks`, webhookRouter)

var imagesDir = 'uploads';
var mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
};

app.get('*', function (req, res) {
    var file = path.join(imagesDir, req.path.replace(/\/$/, '/index.html'))
    if (file.indexOf(imagesDir + path.sep) !== 0) {
        return res.status(403).end('Forbidden')
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain'
    var s = fs.createReadStream(file)
    s.on('open', function () {
        res.set('Content-Type', type)
        s.pipe(res)
    })
    s.on('error', function () {
        res.set('Content-Type', 'text/plain')
        res.status(404).end('Not found')
    })
})

module.exports = app
