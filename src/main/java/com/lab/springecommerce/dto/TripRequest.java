package com.lab.springecommerce.dto;

/*
    @project   spring-ecommerce
    @class     TripRequest
    @version   1.0.0
    @since     12/16/2025 - 21:16
*/

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TripRequest {
    private Long routeId;
    private LocalDateTime departureDateTime;
    private Integer availableSeats;
    private BigDecimal pricePerSeat;

    public TripRequest() {}

    public TripRequest(Long routeId, LocalDateTime departureDateTime, Integer availableSeats, BigDecimal pricePerSeat) {
        this.routeId = routeId;
        this.departureDateTime = departureDateTime;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
    }

    // Getters and Setters
    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public LocalDateTime getDepartureDateTime() {
        return departureDateTime;
    }

    public void setDepartureDateTime(LocalDateTime departureDateTime) {
        this.departureDateTime = departureDateTime;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public BigDecimal getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(BigDecimal pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }
}