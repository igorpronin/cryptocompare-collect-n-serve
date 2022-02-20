export const successDTO = (data: any, id?: string | number) => {
  return {
    jsonrpc: '2.0',
    id: id ? id : null,
    result: data
  }
}
