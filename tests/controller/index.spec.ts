import indexController from '../../src/controllers/index'
import messageController from '../../src/controllers/message'
import { type Request, type Response } from 'express'

describe('Index Controller', () => {
  test("responds 'Hello!'", () => {
    const mockRequest: Partial<Request<any>> = {}
    const mockResponse: Partial<Response<any>> = { send: jest.fn() }

    indexController(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.send).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).toHaveBeenCalledWith('Hello!')
  })
})

describe('Message Controller', () => {
  test("responds with a user'/s message", () => {
    const mockRequest: Partial<Request<any>> = { params: { message: 'I am a user!' } }
    const mockResponse: Partial<Response<any>> = { send: jest.fn() }

    messageController(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.send).toHaveBeenCalledTimes(1)
    expect(mockResponse.send).toHaveBeenCalledWith(mockRequest.params.message)
  })
})
