package topic

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func RegisterHandlers(service Service, router *mux.Router) {
	res := resource{service}
	router.HandleFunc("/{name}", res.get).Methods(http.MethodGet, http.MethodOptions)
}

type resource struct {
	service Service
}

func (res resource) get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	topic, err := res.service.Get(vars["name"])
	if err != nil {
		// Not found
		w.WriteHeader(http.StatusNotFound)
		w.Write(nil)
		return
	}
	// marshal topic
	jsonData, err := json.Marshal(topic)

	if err != nil {
		// Cannot process topic
		w.WriteHeader(http.StatusUnprocessableEntity)
		w.Write(nil)
		return
	}
	// Return topic
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
