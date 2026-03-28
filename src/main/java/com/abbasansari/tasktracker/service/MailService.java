package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.model.Task;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendReminder(Task task) {
        String userEmail = task.getUser().getEmail();
        String userName  = task.getUser().getName();
        sendScheduledReminder(userEmail, userName, task.getTitle(), task.getDescription(), task.getDueDate());
    }

    public void sendScheduledReminder(String toEmail, String userName,
                                       String title, String description,
                                       java.time.LocalDateTime dueDate) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Task Reminder: " + title);
        message.setText(
                "Hi " + userName + ",\n\n" +
                "This is a reminder for your task:\n" +
                "Title: " + title + "\n" +
                "Description: " + (description != null ? description : "N/A") + "\n" +
                "Due at: " + dueDate + "\n\n" +
                "Stay on track!\n— TaskTracker"
        );
        mailSender.send(message);
    }

    public void sendTestMail(String toEmail) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(fromEmail);
        msg.setTo(toEmail);
        msg.setSubject("SMTP Test");
        msg.setText("If you received this, your mail configuration works.");
        mailSender.send(msg);
    }
}
