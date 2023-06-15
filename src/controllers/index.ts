import { type Request, type Response } from 'express'

const indexController = (request: Request, response: Response): void => {
  response.send('Hello!')
}

export default indexController
