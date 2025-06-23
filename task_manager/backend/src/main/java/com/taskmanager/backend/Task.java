package com.taskmanager.backend;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;
    private String task_name;
    private boolean done;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "todo_id")
    private Todo todo;

    protected Task(){}

    public Task(String task_name,boolean done, Todo todo ) {
        this.task_name = task_name;
        this.done = done;
        this.todo = todo;
    }

    public int getTask_id() {
        return task_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String task_name) {
        this.task_name = task_name;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public Todo getTodo() {
        return todo;
    }

    public void setTodo(Todo todo) {
        this.todo = todo;
    }
}
