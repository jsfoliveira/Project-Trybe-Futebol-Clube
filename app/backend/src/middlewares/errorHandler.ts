import { NextFunction, Request, Response } from 'express';

// Midleware de erro acontece quando e qualquer erro assíncrono vai ser lançado pra cá.
// npm install express-async-errors --save
function errorHandler(err:Error, _req:Request, res:Response, _next:NextFunction) {
  res.status(500).json({ message: err.message });
}

export default errorHandler;
