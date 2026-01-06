package com.abbasansari.tasktracker.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendTestMail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("abbasxansari@gmail.com");
        msg.setSubject("SMTP Test");
        msg.setText("If you received this, mail configuration works.");

        mailSender.send(msg);
    }
}

