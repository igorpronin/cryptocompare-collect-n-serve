Create a service that collect data from cryptocompare.com using its API and stores it in a database (MySQL/PostgreSQL/Mongo)
Example API request: GET https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR

REQUIREMENTS:
1. ✅ Currency pairs must be configurable.
2. ✅ Database parameters must be configurable.
3. ✅ Service must store data in database by a scheduler.
4. ✅ If cryptocompare's api is not accessible service must serve data from its database.
5. ✅ API should accept as many fsyms/tsyms in one request as possible (ex.: GET service/price?fsyms=BTC,LINK,MKR&tsyms=USD,EUR,ETH,LTC should return all pair prices)
6. ✅ Data in response must be fresh (realtime). 2-3 minutes discrepancy is ok.

ADDITIONAL POINTS:
1. ✅✅✅ Service scalability is a plus.
2. 🚫 Following standard go project layout is a plus.
3. ✅ Websocket API for the service is a plus.
4. [WIP] Using docker to build and run the service is a plus.
5. ✅ Nicely written README with clear instructions is a plus
