import type { Request, Response } from "express";

const indexController = (request:Request, response:Response) => {
  response.send('Hello!');
};

export default indexController;