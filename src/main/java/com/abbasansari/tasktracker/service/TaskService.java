package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;
    private SchedulerService schedulerService;

    public TaskService(TaskRepository repository, SchedulerService schedulerService) {
        this.repository = repository;
        this.schedulerService = schedulerService;
    }

    public void createTask(TaskRequestDto dto) {
        Task task = new Task(
                null,
                dto.getTitle(),
                dto.getDescription(),
                dto.getDueDate(),
                false,
                dto.getPriority(),
                dto.getCategory()
        );
        Task saved = repository.save(task);
        schedulerService.scheduleReminder(saved);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task getTask(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void completeTask(Long id) {
        Task task = getTask(id);
        task.setCompleted(true);
        repository.save(task);
    }
}