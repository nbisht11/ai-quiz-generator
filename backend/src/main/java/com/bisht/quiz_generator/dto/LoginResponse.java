package com.bisht.quiz_generator.dto;

public class LoginResponse {

    private String token;
    private String staus;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getStaus() {
        return staus;
    }

    public void setStaus(String staus) {
        this.staus = staus;
    }
}
