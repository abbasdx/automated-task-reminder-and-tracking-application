package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.AuthResponseDto;
import com.abbasansari.tasktracker.dto.LoginRequestDto;
import com.abbasansari.tasktracker.dto.SignupRequestDto;

public interface IAuthService {
    AuthResponseDto signup(SignupRequestDto dto);
    AuthResponseDto login(LoginRequestDto dto);
}

