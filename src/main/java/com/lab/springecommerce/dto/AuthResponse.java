package com.lab.springecommerce.dto;

/*
    @project   spring-ecommerce
    @class     AuthResponse
    @version   1.0.0
    @since     15.11.2025 - 00:53
*/

import com.lab.springecommerce.model.UserRole;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private UserRole role; // DRIVER або PASSENGER

    public AuthResponse() {}

    public AuthResponse(String token, String name, String email, UserRole role) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}