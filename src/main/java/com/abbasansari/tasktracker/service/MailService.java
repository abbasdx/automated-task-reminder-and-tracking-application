package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.model.Task;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Verify Email");

        message.setText(
                "Your OTP is: " + otp +
                        "\nValid for 10 minutes."
        );

        mailSender.send(message);
    }

    public void sendReminderEmail(
            String toEmail,
            String userName,
            String title,
            String description,
            LocalDateTime dueDate,
            String reminderType
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(toEmail);

        message.setSubject(reminderType + " - " + title);

        message.setText(
                "Hi " + userName + ",\n\n" +
                        reminderType + "\n\n" +
                        "Task: " + title + "\n" +
                        "Description: " +
                        (description != null ? description : "N/A") + "\n" +
                        "Due Date: " + dueDate
        );

        mailSender.send(message);
    }
}