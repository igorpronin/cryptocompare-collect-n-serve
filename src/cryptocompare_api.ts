const env = require('dotenv').config().parsed;
import {RawCryptoCompareData} from './interfaces';
import axios from 'axios';

export const getRawFullMultiData = async (fsyms: string, tsyms: string): Promise<RawCryptoCompareData | null> => {
  const SERVICE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull';
  const URI = `${SERVICE_URL}?fsyms=${fsyms}&tsyms=${tsyms}`;
  try {
    console.log(`[${new Date()}] Fetching data from CryptoCompare...`);
    if (env.DEBUG_CRYPTOCOMPARE_FETCH_ERROR === '1') throw new Error();
    const {data} = await axios(URI);
    console.log(`[${new Date()}] Fetching data from CryptoCompare successful`);
    return data?.RAW;
  } catch {
    console.log(`[${new Date()}] CryptoCompare fetch error!`);
    return null;
  }
}
