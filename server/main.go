package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Todo object
type Todo struct {
	ID          *int    `json:"id"`
	Description *string `json:"description"`
	Completed   *bool   `json:"completed"`
}

// Status for reports via api
type Status struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

var todos = []Todo{}

// ListTodo lists all todo data
func ListTodo(res http.ResponseWriter, req *http.Request) {
	json.NewEncoder(res).Encode(todos)
}

// AddTodo adds another todo in list
func AddTodo(res http.ResponseWriter, req *http.Request) {
	var todo Todo
	status := Status{Success: false}

	err := json.NewDecoder(req.Body).Decode(&todo)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		log.Println(err)
	} else {
		if todo.ID != nil {
			res.WriteHeader(http.StatusBadRequest)
			status.Message = "ID should be blanked."
		} else if todo.Description == nil {
			res.WriteHeader(http.StatusBadRequest)
			status.Message = "Please fill all data"
		} else {
			if todo.Completed == nil {
				completed := false
				todo.Completed = &completed
			}
			todos = append(todos, todo)
			status.Success = true
		}
	}

	json.NewEncoder(res).Encode(status)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/list", ListTodo).Methods("GET")
	router.HandleFunc("/add", AddTodo).Methods("POST")
	log.Println("Start server complete.")
	log.Fatal(http.ListenAndServe(":8000", router))
}
