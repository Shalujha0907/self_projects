package com.taskmanager.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return  taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody  Task task) {
        int todoId = task.getTodo().getTodo_id();
        Todo todo = todoRepository.findById(todoId).orElse(null);
        task.setTodo(todo);

        return  taskRepository.save(task);
    }
}
