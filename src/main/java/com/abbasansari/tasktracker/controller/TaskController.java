package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.service.MailService;
import com.abbasansari.tasktracker.service.SchedulerService;
import com.abbasansari.tasktracker.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/add")
    public String add(@RequestBody TaskRequestDto dto) {
        taskService.createTask(dto);
        return "Task added successfully";
    }

    @GetMapping("/list")
    public List<Task> list() {
        return taskService.getAllTasks();
    }

    @PutMapping("/complete/{id}")
    public String mark(@PathVariable Long id) {
        taskService.completeTask(id);
        return "Task marked as completed";
    }
    
}

