import {Request, Response, NextFunction} from 'express';
import {errorDTO} from '../../dtos/error_dto';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json(errorDTO(err.message));
}

export default errorMiddleware;
