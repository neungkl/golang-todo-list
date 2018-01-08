package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var db *sql.DB

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
	Data    *Todo  `json:"data,omitempty"`
}

// ListTodo lists all todo data
func ListTodo(res http.ResponseWriter, req *http.Request) {
	status := Status{Success: true}
	rows, err := db.Query(`SELECT id, description, completed FROM todo ORDER BY id`)

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		status.Success = false
		log.Println(err)
	} else {
		defer rows.Close()
	}

	var todos = []Todo{}
	for rows.Next() {
		todo := Todo{}

		err := rows.Scan(&todo.ID, &todo.Description, &todo.Completed)

		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			status.Success = false
			log.Println(err)
		} else {
			todos = append(todos, todo)
		}
	}

	if !status.Success {
		json.NewEncoder(res).Encode(status)
	} else {
		json.NewEncoder(res).Encode(todos)
	}
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
			var userid int
			err := db.QueryRow(`
				INSERT INTO todo(description, completed) VALUES($1, $2) RETURNING id
			`, todo.Description, todo.Completed).Scan(&userid)

			if err != nil {
				res.WriteHeader(http.StatusBadRequest)
				log.Println(err)
			} else {
				status.Success = true
				data := Todo{ID: &userid}
				status.Data = &data
			}
		}
	}

	json.NewEncoder(res).Encode(status)
}

// UpdateTodo updates todo
func UpdateTodo(res http.ResponseWriter, req *http.Request) {
	var todo Todo
	status := Status{Success: false}

	err := json.NewDecoder(req.Body).Decode(&todo)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		log.Println(err)
	} else {
		if todo.ID == nil {
			res.WriteHeader(http.StatusBadRequest)
			status.Message = "ID should not be blanked"
		} else {
			var userid int
			err := db.QueryRow(`
				UPDATE todo SET description = $1, completed = $2 WHERE id = $3 RETURNING id
			`, todo.Description, todo.Completed, todo.ID).Scan(&userid)

			if err != nil {
				res.WriteHeader(http.StatusBadRequest)
				log.Println(err)
			} else {
				status.Success = true
				status.Data = &todo
			}
		}
	}

	json.NewEncoder(res).Encode(status)
}

// DeleteTodo deletes todo
func DeleteTodo(res http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(req.URL.Query().Get("id"))
	status := Status{Success: false}

	if err == nil {
		var userid int
		err := db.QueryRow(`DELETE FROM todo WHERE id = $1 RETURNING id`, id).Scan(&userid)

		if err != nil {
			res.WriteHeader(http.StatusBadRequest)
			log.Println(err)
		} else {
			status.Success = true
		}
	} else {
		res.WriteHeader(http.StatusBadRequest)
		log.Println(err)
	}

	json.NewEncoder(res).Encode(status)
}

func main() {
	connStr := "postgres://postgres:todopass@db/postgres?sslmode=disable"
	pgDb, err := sql.Open("postgres", connStr)
	db = pgDb
	if err != nil {
		log.Fatal(err)
	}

	router := mux.NewRouter()
	router.HandleFunc("/list", ListTodo).Methods("GET")
	router.HandleFunc("/add", AddTodo).Methods("POST")
	router.HandleFunc("/update", UpdateTodo).Methods("POST")
	router.HandleFunc("/delete", DeleteTodo).Methods("DELETE")

	router.HandleFunc("/{path:.*}", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		if strings.HasSuffix(path, "vue") {
			w.Header().Set("Content-Type", "apllication/javascript")
		}
		http.ServeFile(w, r, "../frontend/"+r.URL.Path)
	})

	log.Println("Start server complete.")
	log.Fatal(http.ListenAndServe(":8000", router))
}
