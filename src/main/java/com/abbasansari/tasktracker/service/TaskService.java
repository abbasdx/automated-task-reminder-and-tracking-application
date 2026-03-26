package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService implements ITaskService {

    private final TaskRepository repository;
    private final SchedulerService schedulerService;

    public TaskService(TaskRepository repository, SchedulerService schedulerService) {
        this.repository = repository;
        this.schedulerService = schedulerService;
    }

    @Override
    public Task createTask(TaskRequestDto dto, User user) {
        Task task = new Task(
                null,
                dto.getTitle(),
                dto.getDescription(),
                dto.getDueDate(),
                false,
                dto.getPriority(),
                dto.getCategory(),
                user
        );
        Task saved = repository.save(task);
        schedulerService.scheduleReminder(saved);
        return saved;
    }

    @Override
    public void deleteTask(Long id, User user) {
        Task task = getTaskById(id, user);
        repository.delete(task);
    }

    @Override
    public List<Task> getAllTasks(User user) {
        return repository.findByUser(user);
    }

    @Override
    public Task getTaskById(Long id, User user) {
        return repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Task not found or access denied"));
    }

    @Override
    public void completeTask(Long id, User user) {
        Task task = getTaskById(id, user);
        task.setCompleted(true);
        repository.save(task);
    }
}