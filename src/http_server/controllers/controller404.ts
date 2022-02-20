import {Request, Response} from 'express';

const controller404 = (req: Request, res: Response) => {
  res.sendStatus(404);
};

export default controller404;
