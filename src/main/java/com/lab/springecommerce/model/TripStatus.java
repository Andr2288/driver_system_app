package com.lab.springecommerce.model;

/*
    @project   spring-ecommerce
    @class     TripStatus
    @version   1.0.0
    @since     12/16/2025 - 21:15
*/

public enum TripStatus {
    PLANNED,    // Запланований (ще не почався)
    ACTIVE,     // Активний (в процесі)
    COMPLETED,  // Завершений
    CANCELLED   // Скасований
}