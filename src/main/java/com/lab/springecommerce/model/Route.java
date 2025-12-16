package com.lab.springecommerce.model;

/*
    @project   spring-ecommerce
    @class     Route
    @version   1.0.0
    @since     12/16/2025 - 21:14
*/

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Route")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "driver_name", nullable = false)
    private Customer driver;

    @Column(name = "start_point", nullable = false, length = 255)
    private String startPoint;

    @Column(name = "end_point", nullable = false, length = 255)
    private String endPoint;

    @Column(name = "distance")
    private Double distance; // км

    @Column(name = "estimated_duration")
    private Integer estimatedDuration; // хвилини

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Route() {
        this.createdAt = LocalDateTime.now();
    }

    public Route(Customer driver, String startPoint, String endPoint) {
        this();
        this.driver = driver;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Customer getDriver() {
        return driver;
    }

    public void setDriver(Customer driver) {
        this.driver = driver;
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
