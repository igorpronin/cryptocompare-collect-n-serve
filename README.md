# cryptocompare-collect-n-serve

If you are from bequant.io, please also follow [here](/SPEC.md).

Service collects and store data from cryptocompare.com, and serves it via HTTP- or WebSocket-api.

Data and currencies are configurable. If cryptocompare.com is not available for any reasons, service provides latest stored data. 

## Setup

1. `npm i`
2. Set initial settings in `.env`, use `.env.example` as an example.
3. Create database `node scripts/create_database.js`, also available drop database script `node scripts/delete_database.js`
4. Configure currency pairs and other settings at `configs/base`, or use defaults, more [here](#Configuration).
5. Build `npm run build`
6. Run `npm start`
7. Profit!

## API

Service follows [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

### HTTP-api

HTTP-api root path is available for settlement at `.env` file.

#### Available methods

`GET /api/prices/full`

Query parameters:

- `fsyms` - base currencies (required);
- `tsyms` - secondary currencies (required).

Example request:

`GET /api/prices/full?fsyms=BTC,ETH&tsyms=USD,ETH,DOGE`

### WebSocket-api

Provide a valid JSON to get a result via WebSocket, follow [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

In every WebSocket request if field `id` provided, the result will be returned with the same value of provided `id`

Via WebSocket is available on-request data and subscriptions.

#### WebSocket endpoint

`{HOST:PORT}/ws`

WebSocket endpoint is available for settlement at `.env` file.

#### Available methods

Method `prices/full` - provides full prices data by requested currencies.

`params`, `params.fsyms`, `params.tsyms` - required.

Example request:

```
{
  "jsonrpc": "2.0",
  "method": "prices/full",
  "id": "clients-string",
  "params": {
    {
      "fsyms": ["BTC"], 
      "tsyms": ["ETH", "USD"]
    }
  }
}
```

Method `subscribe/prices/full/all` - provides full prices data via subscription by all available currencies, with the interval, used by the service to collect and update data from cryptocompare.com.

```
{
  "jsonrpc": "2.0",
  "method": "subscribe/prices/full/all",
  "id": "clients-string"
}
```

## Configuration

### Update interval

Field `updateRateMinutes` 

Set its value to any value between `1` and `10`.

### Currencies

Field `currencyPairs`

Set primary currency, and list of secondary currencies for each primary currency. Full coins list, available for settlement is here: `https://min-api.cryptocompare.com/data/all/coinlist`. WARNING!! Be careful, the request is too heavy.

Each added primary currency will create the same table at database.

### Stored data

Field `fields`.

Provide to this field name and type of data, needs to be stored. Available values can be copied from here: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD`

Field's value `name` must be the same as field names at `RAW.BTC.USD` object:

Field's value `type` must be one of values `"string"`, `"float"` or `"integer"`.

```
{
  TYPE: "5",
  MARKET: "CCCAGG",
  FROMSYMBOL: "BTC",
  ...
}
```

Each field value will synchronize all currencies tables, adding the same fields to each table. Only this data fields from cryptocompare.com will be stored and served to clients.

## Scalability of the service

Project structure allows to expand the app vary simple, at any ways. Just add new service `src/services`, route, model, WS-method, subscription or any else. Project structure allows to add any functionality without its changes.

## Contacts

https://t.me/igorpronin


