import { type Request, type Response } from 'express'

const messageController = (request: Request, response: Response): void => {
  response.send(request.params.message)
}

export default messageController
