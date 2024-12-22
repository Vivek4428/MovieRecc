package com.example.movie.model;

public class LoginResponse {
    private String token;

    // Constructor
    public LoginResponse() {}

    public LoginResponse(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
               "token='" + token + '\'' +
               '}';
    }
}
