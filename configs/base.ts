import {Settings} from './interfaces';

const settings: Settings = {
  updateRateMinutes: '1',
  currencyPairs: {
    'BTC': ['EUR', 'USD', 'ETH', 'DOGE'],
    'ETH': ['EUR', 'USD', 'BTC', 'SOL']
  },
  fields: [
    {
      name: 'TYPE',
      type: 'string'
    },
    {
      name: 'OPENDAY',
      type: 'float'
    },
    {
      name: 'HIGHDAY',
      type: 'float'
    },
    {
      name: 'LOWDAY',
      type: 'float'
    },
    {
      name: 'CHANGE24HOUR',
      type: 'float'
    }
  ]
}

export default settings;
