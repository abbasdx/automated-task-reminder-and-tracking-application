package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.OverviewResponseDto;
import com.abbasansari.tasktracker.model.Task;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReportService {

    private final TaskService taskService;

    public ReportService(TaskService taskService) {
        this.taskService = taskService;
    }

    public OverviewResponseDto overview() {
        List<Task> tasks = taskService.getAllTasks();

        int totalTasks = tasks.size();
        int completedTasks = 0;

        for (Task task : tasks) {
            if (task.isCompleted()) {
                completedTasks++;
            }
        }

        int pendingTasks = totalTasks - completedTasks;

        return new OverviewResponseDto(
                totalTasks,
                completedTasks,
                pendingTasks
        );
    }
}

