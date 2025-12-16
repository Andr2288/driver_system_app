package com.lab.springecommerce.dto;

/*
    @project   spring-ecommerce
    @class     RouteRequest
    @version   1.0.0
    @since     12/16/2025 - 21:15
*/

public class RouteRequest {
    private String startPoint;
    private String endPoint;
    private Double distance;
    private Integer estimatedDuration;

    public RouteRequest() {}

    public RouteRequest(String startPoint, String endPoint, Double distance, Integer estimatedDuration) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.distance = distance;
        this.estimatedDuration = estimatedDuration;
    }

    // Getters and Setters
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
}
