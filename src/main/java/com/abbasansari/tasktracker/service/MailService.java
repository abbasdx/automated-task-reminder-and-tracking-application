package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.model.Task;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendReminder(Task task) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("abbasxansari@gmail.com");
        message.setSubject("Task Reminder");
        message.setText(
                "Reminder: " + task.getTitle() +
                        "\nDue at: " + task.getDueDate()
        );
        mailSender.send(message);
    }

    public void sendTestMail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("abbasxansari@gmail.com");
        msg.setSubject("SMTP Test");
        msg.setText("If you received this, mail configuration works.");

        mailSender.send(msg);
    }
}

