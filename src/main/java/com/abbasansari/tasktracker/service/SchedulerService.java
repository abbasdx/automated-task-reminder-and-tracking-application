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

        if (!task.getUser().isEmailVerified()
                || task.getDueDate() == null) {
            return;
        }

        LocalDateTime dueDate = task.getDueDate();

        scheduleSingleReminder(
                dueDate.minusHours(1),
                task,
                "1 Hour Remaining"
        );

        scheduleSingleReminder(
                dueDate.minusMinutes(10),
                task,
                "10 Minutes Remaining"
        );

        scheduleSingleReminder(
                dueDate,
                task,
                "Task Deadline Reached"
        );
    }

    private void scheduleSingleReminder(
            LocalDateTime reminderTime,
            Task task,
            String reminderType
    ) {

        long delay = Duration.between(
                LocalDateTime.now(),
                reminderTime
        ).toMillis();

        if (delay <= 0) {
            return;
        }

        ReminderExecutor.getExecutor().schedule(
                () -> mailService.sendReminderEmail(
                        task.getUser().getEmail(),
                        task.getUser().getName(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getDueDate(),
                        reminderType
                ),
                delay,
                TimeUnit.MILLISECONDS
        );
    }
}