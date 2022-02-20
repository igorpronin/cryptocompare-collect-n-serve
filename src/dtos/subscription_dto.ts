export const subscriptionDTO = (data: any, channel: string) => {
  return {
    jsonrpc: '2.0',
    method: 'subscription',
    params: {channel, data}
  }
}
