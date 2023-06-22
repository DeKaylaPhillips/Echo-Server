import express from 'express'
import indexController from '../src/controllers/index'
import messageController from '../src/controllers/message'
export const app = express()

app.get('/', indexController)
app.get('/:message', messageController)

app.listen(3000)
