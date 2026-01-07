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

        long delay = Duration.between(
                LocalDateTime.now(), task.getDueDate()
        ).toMillis();

        if (delay <= 0) return;

        ReminderExecutor.getExecutor().schedule(
                () -> mailService.sendReminder(task),
                delay,
                TimeUnit.MILLISECONDS
        );
    }
}
