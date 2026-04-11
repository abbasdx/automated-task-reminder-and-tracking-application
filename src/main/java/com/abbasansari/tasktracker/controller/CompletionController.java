package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.service.ITaskService;
import com.abbasansari.tasktracker.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class CompletionController {

    private final ITaskService taskService;
    private final AuthUtil authUtil;

    public CompletionController(ITaskService taskService, AuthUtil authUtil) {
        this.taskService = taskService;
        this.authUtil = authUtil;
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> complete(@PathVariable Long id) {
        User user = authUtil.getCurrentUser();
        taskService.completeTask(id, user);
        return ResponseEntity.ok("Task marked as completed");
    }

    @PutMapping("/{id}/incomplete")
    public ResponseEntity<String> incomplete(@PathVariable Long id) {
        User user = authUtil.getCurrentUser();
        taskService.incompleteTask(id, user);
        return ResponseEntity.ok("Task marked as incomplete");
    }
}
