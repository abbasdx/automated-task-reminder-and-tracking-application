package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.model.Task;
import com.abbasansari.tasktracker.scheduler.ReminderExecutor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
public class SchedulerService {

    private final MailService mailService;

    public SchedulerService(MailService mailService) {
        this.mailService = mailService;
    }

    public void scheduleReminder(Task task) {
        if (task.getDueDate() == null) return;

        long delay = Duration.between(LocalDateTime.now(), task.getDueDate()).toMillis();
        if (delay <= 0) return;

        String userEmail = task.getUser().getEmail();
        String userName  = task.getUser().getName();
        String title     = task.getTitle();
        String desc      = task.getDescription();
        LocalDateTime dueDate = task.getDueDate();

        ReminderExecutor.getExecutor().schedule(
                () -> mailService.sendScheduledReminder(userEmail, userName, title, desc, dueDate),
                delay,
                TimeUnit.MILLISECONDS
        );
    }
}
