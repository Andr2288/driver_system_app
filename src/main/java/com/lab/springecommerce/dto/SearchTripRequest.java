package com.lab.springecommerce.dto;

/*
    @project   spring-ecommerce
    @class     SearchTripRequest
    @version   1.0.0
    @since     12/16/2025 - 21:19
*/

public class SearchTripRequest {
    private String startPoint;
    private String endPoint;

    public SearchTripRequest() {}

    public SearchTripRequest(String startPoint, String endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
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
}