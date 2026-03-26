package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.model.User;

import java.util.List;

public interface ITaskService {
    Task createTask(TaskRequestDto dto, User user);
    Task getTaskById(Long id, User user);
    List<Task> getAllTasks(User user);
    void deleteTask(Long id, User user);
    void completeTask(Long id, User user);
}
