# finnhub-graphql
A simple graphql wrapper I built around the https://finnhub.io/ API in a weekend. Using this project as a baseline for functionality around a code generator that I'm privately writing. The API token hard coded into the requests is not a valid token so if you pull this down, you'll have to replace it with your own token.

It currently mirrors the functionality of the "Stock Fundamentals" portion of their API however I have added the `company(symbol: String)` field in order to have this API utilize the power of graphql resolvers and aggregate all of the individual calls you'd normally have to make to the REST API into a single field that you can query to get all the information about that one company.
