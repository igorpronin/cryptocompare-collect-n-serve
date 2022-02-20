import {availableFsyms, availableTsyms} from '../data_service';

export const validateFullPriceHTTPRequest = (query: any): string | null => {
  if (!query || Object.keys(query).length === 0) return 'GET-parameters "fsyms" and "tsyms" required';
  if (typeof query.fsyms === 'undefined' || query.fsyms === '') return 'GET-parameter "fsyms" is required';
  if (typeof query.tsyms === 'undefined' || query.tsyms === '') return 'GET-parameter "tsyms" is required';
  const primary = query.fsyms.split(',');
  for (let i = 0; i < primary.length; i++) {
    const item = primary[i];
    if (!availableFsyms.includes(item)) return `GET-parameter "fsyms" as "${item}" not available`;
  }
  const secondary = query.tsyms.split(',');
  for (let i = 0; i < secondary.length; i++) {
    const item = secondary[i];
    if (!availableTsyms.includes(item)) return `GET-parameter "tsyms" as "${item}" not available`;
  }
  return null;
}

export const validateFullPriceWSRequestMessage = (message: any) => {
  const {params} = message;
  if (!params) return 'Field "params" required. Please follow JSON-RPC 2.0 Specification'
  const {fsyms, tsyms} = params;
  if (!fsyms) return 'Field "params.fsyms" required';
  if (!tsyms) return 'Field "params.tsyms" required';
  if (!Array.isArray(fsyms)) return 'Field "params.fsyms" is not valid';
  if (!Array.isArray(tsyms)) return 'Field "params.tsyms" is not valid';
  for (let i = 0; i < fsyms.length; i++) {
    const item = fsyms[i];
    if (!availableFsyms.includes(item)) return `Field "params.fsyms" as "${item}" not available`;
  }
  for (let i = 0; i < tsyms.length; i++) {
    const item = tsyms[i];
    if (!availableTsyms.includes(item)) return `Field "params.tsyms" as "${item}" not available`;
  }
  return null;
}
