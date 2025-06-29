package com.taskmanager.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{task_id}")
    public ResponseEntity<String> deleteTask(@PathVariable int task_id) {
        Task targetTask = taskRepository.findById(task_id).orElseThrow();
        taskRepository.delete(targetTask);

        return  ResponseEntity.ok("Task deleted successfully!");
    }

    @PatchMapping("/{task_id}")
    public ResponseEntity<String> updateTask(@PathVariable int task_id, @RequestBody Task task) {
        Task targetTask = taskRepository.findById(task_id).orElseThrow();
        targetTask.setDone(task.isDone());
        taskRepository.save(targetTask);

        return ResponseEntity.ok("Task updated successfully!");
    }
}
