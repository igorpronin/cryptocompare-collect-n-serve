import config from '../../../configs/base';
import {getRawFullMultiData} from '../../cryptocompare_api';
import {FilteredCryptoCompareData, RawCryptoCompareData} from '../../interfaces';
import {CurrencyPairs, Field} from '../../../configs/interfaces';
import models, {getLatestCurrencyRow} from '../../models';
import lo from 'lodash';
const {currencyPairs, fields} = config;

export const availableFsyms = Object.keys(currencyPairs).join(',');
const secondaryCurrencies = new Set();

for (let key in currencyPairs) {
  const primary = currencyPairs[key];
  primary.forEach(secondary => secondaryCurrencies.add(secondary));
}

export const availableTsyms = Array.from(secondaryCurrencies).join(',');

export const getFilteredFullData = (rawData: RawCryptoCompareData, currencyPairs: CurrencyPairs, fields: Field[]): FilteredCryptoCompareData => {
  const result: FilteredCryptoCompareData = {};
  for (let primary in currencyPairs) {
    result[primary] = {}
    const row = currencyPairs[primary];
    row.forEach(secondary => {
      result[primary][secondary] = {}
      fields.forEach(field => {
        const value = rawData[primary]?.[secondary]?.[field.name];
        if (typeof value !== 'undefined') {
          result[primary][secondary][field.name] = value;
        } else {
          result[primary][secondary][field.name] = null;
        }
      })
    })
  }
  return result;
}

const getDataByCurrencies = (data: FilteredCryptoCompareData, fsyms: string, tsyms: string) => {
  const primary = fsyms.split(',');
  const secondary = tsyms.split(',');
  const result = lo.cloneDeep(data);
  for (let outer in result) {
    if (!primary.includes(outer)) {
      delete result[outer];
      continue;
    }
    const primaryObj = result[outer];
    for (let inner in primaryObj) {
      if (!secondary.includes(inner)) {
        delete primaryObj[inner];
      }
    }
  }
  return result;
}

const getDataByCurrenciesFromDB = async (models: any, fields: Field[], fsyms: string, tsyms: string) => {
  const result: any = {}
  const primary = fsyms.split(',');
  const secondary = tsyms.split(',');
  const promises: any = [];
  primary.forEach((prim) => {
    result[prim] = {}
    secondary.forEach(sec => {
      promises.push(getLatestCurrencyRow(models, prim, sec).then((res => {
        if (res) {
          result[prim][sec] = res;
          const fieldsList = fields.map(field => field.name);
          for (let key in result[prim][sec]) {
            if (!fieldsList.includes(key)) delete result[prim][sec][key];
          }
        }
      })));
    })
  })
  await Promise.all(promises);
  return result;
}

export const serveFullPricesRequest = async (fsyms: string, tsyms: string) => {
  const result = await getRawFullMultiData(fsyms, tsyms);
  if (result) {
    const filteredData = getFilteredFullData(result, currencyPairs, fields);
    return getDataByCurrencies(filteredData, fsyms, tsyms);
  } else {
    return await getDataByCurrenciesFromDB(models, fields, fsyms, tsyms);
  }
}


