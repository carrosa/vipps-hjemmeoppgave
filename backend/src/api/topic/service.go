package topic

import (
	"backend/src/entity"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/microcosm-cc/bluemonday"
	"io/ioutil"
	"net/http"
	"regexp"
	"strings"
)

type Service interface {
	Get(name string) (entity.Topic, error)
}

type wikiApiResponse struct {
	Parse struct {
		Title string `json:"title"`
		Text  struct {
			Html string `json:"*"`
		} `json:"text"`
	} `json:"parse"`
	Error struct {
		Code string `json:"code"`
	} `json:"error"`
}

type service struct{}

func NewService() Service {
	return service{}
}

func (s service) Get(name string) (entity.Topic, error) {
	// Replace space with underscore, because wikipedia wants this
	underscoredName := strings.Replace(name, " ", "_", -1)
	// Get from wikipedia apiResponse
	resp, err := http.Get(
		fmt.Sprintf( //Remove &section=0 to get the entire article
			"https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=%s", underscoredName))
	if err != nil {
		//return Topic{}, err
		return entity.Topic{}, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	// Parse wikiresponse to json
	var apiResponse wikiApiResponse
	err = json.Unmarshal(body, &apiResponse)
	if err != nil {
		return entity.Topic{}, err
	}
	if apiResponse.Error.Code != "" {
		fmt.Println("TEST")
		return entity.Topic{}, errors.New(apiResponse.Error.Code)
	}

	// sanitize html
	sanitizedHtml := bluemonday.StrictPolicy().Sanitize(apiResponse.Parse.Text.Html)

	// Count instances of title
	regexpTitle := regexp.MustCompile(apiResponse.Parse.Title)
	matches := len(regexpTitle.FindAllStringIndex(sanitizedHtml, -1))

	// return Topic
	return entity.Topic{
		Title:   apiResponse.Parse.Title,
		Matches: matches,
	}, nil

}
