package com.lab.springecommerce.dto;

/*
    @class     RouteResponse
    @version   1.0.0
    @since     12/16/2025 - 21:16
*/

import java.time.LocalDateTime;

public class RouteResponse {
    private Long id;
    private String driverName;
    private String startPoint;
    private String endPoint;
    private Double distance;
    private Integer estimatedDuration;
    private LocalDateTime createdAt;

    public RouteResponse() {}

    public RouteResponse(Long id, String driverName, String startPoint, String endPoint,
                         Double distance, Integer estimatedDuration, LocalDateTime createdAt) {
        this.id = id;
        this.driverName = driverName;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.distance = distance;
        this.estimatedDuration = estimatedDuration;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
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

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Integer getEstimatedDuration() {
        return estimatedDuration;
    }

    public void setEstimatedDuration(Integer estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}