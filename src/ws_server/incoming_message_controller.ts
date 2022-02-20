import WebSocket from 'ws';
import {validateFullPriceWSRequestMessage} from '../services/validation_service';
import {errorDTO} from '../dtos/error_dto';
import {successDTO} from '../dtos/success_dto';
import {serveFullPricesRequest} from '../services/data_service';
import {subscriptionsNaming, clientsSubscriptions} from '../services/subscriptions_service';

const {prices_full_all} = subscriptionsNaming;

export const handleIncoming = async (message: any, ws: WebSocket) => {
  try {
    const res = JSON.parse(message);
    const {id, method, params} = res;
    if (method === 'prices/full') {
      const errMes = validateFullPriceWSRequestMessage(res);
      if (errMes) ws.send(JSON.stringify(errorDTO(errMes, id)));
      const fsyms = params?.fsyms?.join(',');
      const tsyms = params?.tsyms?.join(',');
      const data = await serveFullPricesRequest(fsyms, tsyms);
      ws.send(JSON.stringify(successDTO(data, id)));
    }
    
    // Subscription
    if (method === prices_full_all) {
      clientsSubscriptions[prices_full_all].add(ws);
      ws.send(JSON.stringify(successDTO(true, id)));
    }
  } catch {}
}
