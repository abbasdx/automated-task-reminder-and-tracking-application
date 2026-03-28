package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.service.AiTaskService;
import com.abbasansari.tasktracker.service.ITaskService;
import com.abbasansari.tasktracker.util.AuthUtil;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks/gemini")
public class AiTaskController {

    private final AiTaskService aiTaskService;
    private final ITaskService taskService;
    private final AuthUtil authUtil;

    public AiTaskController(
            AiTaskService aiTaskService,
            ITaskService taskService,
            AuthUtil authUtil
    ) {
        this.aiTaskService = aiTaskService;
        this.taskService = taskService;
        this.authUtil = authUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<Task> addTaskWithGemini(
            @RequestBody @NotBlank String prompt
    ) {

        User user = authUtil.getCurrentUser();

        TaskRequestDto dto = aiTaskService.generateTask(prompt);

        Task savedTask = taskService.createTask(dto, user);

        return ResponseEntity.ok(savedTask);
    }
}