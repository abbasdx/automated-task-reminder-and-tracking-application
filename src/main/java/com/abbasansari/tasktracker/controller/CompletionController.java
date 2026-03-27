package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.service.ITaskService;
import com.abbasansari.tasktracker.util.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/completion")
public class CompletionController {

    private final ITaskService taskService;
    private final AuthUtil authUtil;

    public CompletionController(ITaskService taskService, AuthUtil authUtil) {
        this.taskService = taskService;
        this.authUtil = authUtil;
    }

    @PutMapping("/mark/{id}")
    public ResponseEntity<String> mark(@PathVariable Long id) {
        User user = authUtil.getCurrentUser();
        taskService.completeTask(id, user);
        return ResponseEntity.ok("Task marked as completed");
    }
}
