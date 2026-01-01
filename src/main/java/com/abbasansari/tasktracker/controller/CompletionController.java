package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.service.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/completion")
public class CompletionController {

    private final TaskService taskService;

    public CompletionController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PutMapping("/mark/{id}")
    public String mark(@PathVariable Long id) {
        taskService.completeTask(id);
        return "Task marked as completed";
    }
}

