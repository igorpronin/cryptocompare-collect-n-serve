import {Request, Response, NextFunction} from 'express';

const incomeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Income request...');
  next();
}

export default incomeMiddleware;
