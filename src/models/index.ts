import {DataTypes} from 'sequelize';
import sequelize from '../db';
import config from '../../configs/base';

const pairs = config.currencyPairs;
const fields = config.fields;

const baseCurrencies = Object.keys(pairs);

const models: { [key: string]: any } = {}

const getDataType = (val: string) => {
  switch (val) {
    case 'string':
      return DataTypes.STRING
    case 'integer':
      return DataTypes.BIGINT
    case 'float':
      return DataTypes.FLOAT
  }
}

baseCurrencies.forEach(item => {
  const attributes: any = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    secondary_currency: {
      type: DataTypes.STRING
    }
  };
  fields.forEach(item => {
    attributes[item.name] = {type: getDataType(item.type)}
  })
  models[item] = sequelize.define(item, attributes, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: 'created_at'
  })
});

export const getLatestCurrencyRow = async (models: any, primary: string, secondary: string) => {
  try {
    const Model = models[primary];
    const result = await Model.findOne({
      where: {secondary_currency: secondary},
      order: [['created_at', 'DESC']],
    });
    if (result) {
      const {dataValues} = result;
      return dataValues;
    } else {
      return null;
    }
  } catch {
    return null;
  }
  
}

(async () => {
  for (let key in models) {
    const model = models[key];
    await model.sync({alter: true});
  }
})();

export default models;
