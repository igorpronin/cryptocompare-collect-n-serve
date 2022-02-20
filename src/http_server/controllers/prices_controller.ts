import {NextFunction, Request, Response} from 'express';
import {serveFullPricesRequest} from '../../services/data_service';
import {successDTO} from '../../dtos/success_dto';
import {validateFullPriceHTTPRequest} from '../../services/validation_service';

export const fullPricesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notValidMes = validateFullPriceHTTPRequest(req.query);
    if (notValidMes) throw new Error(notValidMes);
    const {fsyms, tsyms} = req.query;
    const data = await serveFullPricesRequest(fsyms as string, tsyms as string);
    res.json(successDTO(data));
  } catch (e) {
    next(e);
  }
}
