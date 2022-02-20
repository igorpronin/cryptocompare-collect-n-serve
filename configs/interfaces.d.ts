export interface CurrencyPairs {[key: string]: string[]}

export interface Field {
  name: string
  type: 'string' | 'float' | 'integer'
}

export interface Settings {
  updateRateMinutes: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  currencyPairs: CurrencyPairs
  fields: Field[]
}
