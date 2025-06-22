package com.taskmanager.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
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
        int todoId = task.getTodo().getTodoId();
        Todo todo = todoRepository.findById(todoId).orElse(null);

//        int taskId = task.getTaskId();
//        String taskName = task.getTaskName();
//        boolean done = task.isDone();

        task.setTodo(todo);
//        task.setTaskId(taskId);
//        task.setTaskName(taskName);
//        task.setDone(done);

        return  taskRepository.save(task);
    }
}
