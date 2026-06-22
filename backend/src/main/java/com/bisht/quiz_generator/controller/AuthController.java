package com.bisht.quiz_generator.controller;

import com.bisht.quiz_generator.dto.LoginRequest;
import com.bisht.quiz_generator.dto.LoginResponse;
import com.bisht.quiz_generator.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Value("${app.config.default-username}")
    private String username;

    @Value("${app.config.default-password}")
    private String passcode;

    @Autowired
    JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse();
        boolean isPasswordCorrect = this.passcode.equals(request.getPasscode());

        if (isPasswordCorrect) {
            String token = jwtService.generateToken(this.username);
            response.setToken(token);
            return ResponseEntity.ok(response);
        } else {
            response.setStaus("Invalid passcode");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
