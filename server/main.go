package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Todo struct {
	id          int
	description string
	completed   bool
}

type Status struct {
	success bool `json:"success"`
}

var todos = []Todo{}

func ListTodo(res http.ResponseWriter, req *http.Request) {
	json.NewEncoder(res).Encode(todos)
}

func AddTodo(res http.ResponseWriter, req *http.Request) {
	var todo Todo
	// success := false

	err := json.NewDecoder(req.Body).Decode(&todo)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		log.Println(err)
	} else {
		todos = append(todos, todo)
		// success = true
	}
	json.NewEncoder(res).Encode(Status{success: true})
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/list", ListTodo).Methods("GET")
	router.HandleFunc("/add", AddTodo).Methods("POST")
	log.Println("Start server complete.")
	log.Fatal(http.ListenAndServe(":8000", router))
}
