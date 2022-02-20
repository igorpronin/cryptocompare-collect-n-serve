export interface RawCryptoCompareData {
  [key: string]: {
    [key: string]: {
      [key: string]: string | number | null
    }
  }
}

export interface FilteredCryptoCompareData extends RawCryptoCompareData {}
