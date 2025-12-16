package com.lab.springecommerce.dto;

/*
    @class     TripResponse
    @version   1.0.0
    @since     12/16/2025 - 21:17
*/

import com.lab.springecommerce.model.TripStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TripResponse {
    private Long id;
    private Long routeId;
    private String startPoint;
    private String endPoint;
    private String driverName;
    private LocalDateTime departureDateTime;
    private Integer availableSeats;
    private BigDecimal pricePerSeat;
    private TripStatus status;
    private LocalDateTime createdAt;

    public TripResponse() {}

    public TripResponse(Long id, Long routeId, String startPoint, String endPoint, String driverName,
                        LocalDateTime departureDateTime, Integer availableSeats, BigDecimal pricePerSeat,
                        TripStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.routeId = routeId;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.driverName = driverName;
        this.departureDateTime = departureDateTime;
        this.availableSeats = availableSeats;
        this.pricePerSeat = pricePerSeat;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
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

    public TripStatus getStatus() {
        return status;
    }

    public void setStatus(TripStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}