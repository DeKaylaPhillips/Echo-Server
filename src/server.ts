import express from 'express'
import indexController from '../src/controllers/index'
export const app = express()

app.get('/', indexController)

app.listen(3000)
