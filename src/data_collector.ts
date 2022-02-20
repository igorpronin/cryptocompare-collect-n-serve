const env = require('dotenv').config().parsed;
import cron from 'node-cron';
import config from '../configs/base';
import models from './models';
import {FilteredCryptoCompareData} from './interfaces';
import {getRawFullMultiData} from './cryptocompare_api';
import {availableFsyms, availableTsyms, getFilteredFullData} from './services/data_service';
import {handlePricesFullAllSubscriptions} from './services/subscriptions_service';

const {updateRateMinutes, currencyPairs, fields} = config;

const schedule = `*/${updateRateMinutes} * * * *`;

const saveCryptoCompareData = async (data: FilteredCryptoCompareData, models: any): Promise<boolean> => {
  const queries = [];
  for (let primary in data) {
    const currencyObj = data[primary];
    const Model = models[primary];
    for (let secondary in currencyObj) {
      const data = currencyObj[secondary];
      queries.push(Model.create({secondary_currency: secondary, ...data}));
    }
  }
  try {
    await Promise.all(queries);
    return true;
  } catch {
    return false;
  }
}

const taskHandler = async () => {
  const data = await getRawFullMultiData(availableFsyms, availableTsyms);
  if (data) {
    const filteredData = getFilteredFullData(data, currencyPairs, fields);
    handlePricesFullAllSubscriptions(filteredData);
    saveCryptoCompareData(filteredData, models);
  }
}

const task = cron.schedule(schedule, taskHandler, {
  scheduled: false,
  timezone: 'UTC'
});

task.start();

(async () => {
  if (env.FORCE_REQUEST_DATA_ON_START) await taskHandler();
})()
