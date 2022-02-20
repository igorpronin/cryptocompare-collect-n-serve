export const errorDTO = (message: string, id?: string | number) => {
  return {
    jsonrpc: '2.0',
    id: id ? id : null,
    error: {message}
  }
}
