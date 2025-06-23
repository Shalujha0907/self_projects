package com.taskmanager.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public  Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{todo_id}")
    public ResponseEntity<String> deleteTodo(@PathVariable int todo_id) {
        Todo targetTodo = todoRepository.findById(todo_id).orElseThrow();
         todoRepository.delete(targetTodo);
        return ResponseEntity.ok("Todo deleted successfully");
    }

}
