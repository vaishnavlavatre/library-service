To run the Application they need to setup Postgresql


```
docker run --name postgres-container -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres POSTGRES_DB=postgres -d postgres
```


```
npm run dev

```
