package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.model.Verification;
import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.repository.VerificationRepository;
import com.abbasansari.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class VerificationService {

    private final UserRepository userRepository;
    private final VerificationRepository verificationRepository;
    private final MailService mailService;

    public VerificationService(
            UserRepository userRepository,
            VerificationRepository verificationRepository,
            MailService mailService) {

        this.userRepository = userRepository;
        this.verificationRepository = verificationRepository;
        this.mailService = mailService;
    }

    public void sendOtp(String email) {

        String otp =
                String.valueOf(
                        100000 + new Random().nextInt(900000)
                );

        Verification verification =
                verificationRepository.findByEmail(email)
                        .orElse(new Verification());

        verification.setEmail(email);
        verification.setOtp(otp);
        verification.setExpiryTime(
                LocalDateTime.now().plusMinutes(10)
        );

        verificationRepository.save(verification);

        mailService.sendOtpEmail(email, otp);
    }

    public void verifyOtp(String email, String otp) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Verification verification = verificationRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (!verification.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (verification.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        user.setEmailVerified(true);
        userRepository.save(user);

        verificationRepository.delete(verification);

        // Send success email
//        mailService.sendVerificationSuccessEmail(
//                user.getEmail(),
//                user.getName()
//        );
    }
}