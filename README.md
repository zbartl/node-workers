# ip workers

## running (docker)
1. add .env files to api and worker (see: .env.example)
2. update worker/.env to include valid VirusTotal and IpStack API keys
3. `> docker-compose up --build`
4. access 'http://localhost:4000/graphql'
5. run example query below:

``` graphql
{
  scan(
    ip:"8.8.4.4",
    services: [
      "ipstack",
      "virustotal",
      "tcpscan",
      "notaservice"
    ]) {
    ip,
    results {
      service,
      result
    }
  }
}
```

Any services not currently supported should return an error message with the list of available services.