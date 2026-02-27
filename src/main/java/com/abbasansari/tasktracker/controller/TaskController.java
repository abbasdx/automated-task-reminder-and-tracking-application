package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.service.MailService;
import com.abbasansari.tasktracker.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;
    private final MailService mailService;

    public TaskController(TaskService taskService, MailService mailService) {
        this.taskService = taskService;
        this.mailService = mailService;
    }

    @PostMapping("/add")
    public String add(@Valid @RequestBody TaskRequestDto dto) {
        taskService.createTask(dto);
        return "Task added successfully";
    }

    @GetMapping("/list")
    public List<Task> list() {
        return taskService.getAllTasks();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }

    @GetMapping("/test-mail")
    public String testMail() {
        mailService.sendTestMail();
        return "Test mail sent";
    }
}

