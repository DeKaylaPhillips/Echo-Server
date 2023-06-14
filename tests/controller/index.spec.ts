import indexController from '../../src/controllers/index'
import { type Request, type Response } from "express";

describe("Index Controller", () => {
    test("responds 'Hello!'", () => { 
        const mockRequest = {} as Request;
        const mockResponse:Partial<Response<any>> = { send: jest.fn() }
        
        indexController(mockRequest as Request, mockResponse as Response)
        
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith('Hello!');
    });
});