package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.service.ITaskService;
import com.abbasansari.tasktracker.service.MailService;
import com.abbasansari.tasktracker.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final ITaskService taskService;
    private final MailService mailService;
    private final AuthUtil authUtil;

    public TaskController(ITaskService taskService, MailService mailService, AuthUtil authUtil) {
        this.taskService = taskService;
        this.mailService = mailService;
        this.authUtil = authUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<Task> add(@Valid @RequestBody TaskRequestDto dto) {
        User user = authUtil.getCurrentUser();
        return ResponseEntity.ok(taskService.createTask(dto, user));
    }

    @GetMapping("/list")
    public ResponseEntity<List<Task>> list() {
        User user = authUtil.getCurrentUser();
        return ResponseEntity.ok(taskService.getAllTasks(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        User user = authUtil.getCurrentUser();
        return ResponseEntity.ok(taskService.getTaskById(id, user));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        User user = authUtil.getCurrentUser();
        taskService.deleteTask(id, user);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/test-mail")
    public ResponseEntity<String> testMail() {
        String userEmail = authUtil.getCurrentUser().getEmail();
        mailService.sendTestMail(userEmail);
        return ResponseEntity.ok("Test mail sent to " + userEmail);
    }
}
