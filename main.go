package main

import (
	"fmt"
	"log"
	"os"
	"net/http"
	"io/ioutil"
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
)


func main() {

	// environment variables
	apiKey := os.Getenv("API_KEY")


	// Initialize router
	r := gin.Default()

	r.LoadHTMLGlob("ui-dist/*.html")
	r.Static("/static", "./ui-dist/static")
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})


	r.POST("api/search", func(c *gin.Context) {
		type Token struct {
			Token string `json:"token"`
		}

		type SearchResult struct {
			Value string `json:"value"`
		}

		reqBody, err := json.Marshal(map[string]string{
			"apiKey": apiKey,
		})

		if err != nil {
			log.Fatal("Error reading response. ", err)
		}

		buf := new(bytes.Buffer)
		buf.ReadFrom(c.Request.Body)
		reqPostVal := SearchResult{}
		json.Unmarshal(buf.Bytes(), &reqPostVal)

		response, err := http.Post("https://api.thetvdb.com/login", "application/json", bytes.NewBuffer(reqBody))

		if err != nil {
			log.Fatal("Error reading response. ", err)
		}

		defer response.Body.Close()

		body, err := ioutil.ReadAll(response.Body)
		if err != nil {
			log.Fatal("Error reading response tryping to read response body ", err)
		}

		 tokenobj := Token{}

		// Retrieve Token
		json.Unmarshal([]byte(body), &tokenobj)
		if err != nil {
			log.Println(err)
		}

		// Call API
		bearer := "Bearer " + tokenobj.Token
		url := "https://api.thetvdb.com/search/series?name=" + reqPostVal.Value
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			log.Fatal("Error reading request. ", err)
		}

		req.Header.Set("Authorization", bearer)

		client := &http.Client{}

		resp, err := client.Do(req)
		if err != nil {
			log.Fatal("Error reading response. ", err)
		}

		defer resp.Body.Close()

		body, err = ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal("Error response body of search request: ", err)
		}

		b := string(body)


		c.JSON(http.StatusOK, gin.H{
			"result": b,
		})
	})


	// Run the server
	var port = os.Getenv("PORT")
	if port == "" {
		port = "8080"
		fmt.Printf("Defaulting to port %s", port)
	}
	r.Run(":" + port)


}
