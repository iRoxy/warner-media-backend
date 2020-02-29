# warner-media-backend

# Run app
1.) Have `go`, `npm` installed on machine

2.) In `client` directory make sure to install (`npm install`) dependencies from `package.json` and run `npm build` to ensure `/ui-dist` folder gets added to root directory

3.) Ensure you have an account from [TheTVDB](https://thetvdb.com/), if not,
create one and save your API key that you can geneate in the dashboard as an
environment variable. Quick way: `export API_KEY=[insert API key]`

4.) `go run main.go` in root directory and access app through [localhost:8080](http://localhost:8080/)

### To Run Development:
##### Build and run frontend
`npm run build`
`npm start`

##### Run backend
`go run main.go`
