package com.taskmanager.backend;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int todoId;
    private String todo_name;
    @OneToMany(mappedBy = "todo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Task> tasks = new ArrayList<>();

    protected Todo() {
    }

    public Todo(int todo_id, String todo_name, List<Task> tasks) {
        this.todoId = todo_id;
        this.todo_name = todo_name;
        this.tasks = tasks;
    }

    public int getTodoId() {
        return todoId;
    }

    public String getTodo_name() {
        return todo_name;
    }

    public  List<Task> getTasks() {
        return tasks;
    }
}