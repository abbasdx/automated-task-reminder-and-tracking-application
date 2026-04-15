package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.service.VerificationService;
import com.abbasansari.tasktracker.service.VerificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/verification")
public class VerificationController {

    private final VerificationService verificationService;

    public VerificationController(
            VerificationService verificationService) {

        this.verificationService = verificationService;
    }

    @PostMapping("/otp")
    public ResponseEntity<String> sendOtp(
            @RequestParam String email) {

        verificationService.sendOtp(email);

        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        verificationService.verifyOtp(email, otp);

        return ResponseEntity.ok("Email verified");
    }
}