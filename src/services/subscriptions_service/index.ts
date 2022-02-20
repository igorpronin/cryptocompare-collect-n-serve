import WebSocket from 'ws';
import {subscriptionDTO} from '../../dtos/subscription_dto';

export const subscriptionsNaming = {
  prices_full_all: 'subscribe/prices/full/all'
}

export const clientsSubscriptions =  {
  [subscriptionsNaming.prices_full_all]: new Set<WebSocket>()
}

export const handlePricesFullAllSubscriptions = (data: any) => {
  const clientsSet = clientsSubscriptions[subscriptionsNaming.prices_full_all];
  clientsSet.forEach((client: WebSocket) => {
    try {
      if (client.readyState === WebSocket.CLOSED) {
        clientsSet.delete(client);
        return;
      }
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(subscriptionDTO(data, subscriptionsNaming.prices_full_all)));
      }
    } catch {
      clientsSet.delete(client);
    }
  })
}
