package com.lab.springecommerce.service;

/*
    @class     RouteService
    @version   1.0.0
    @since     12/16/2025 - 21:20
*/

import com.lab.springecommerce.dto.RouteRequest;
import com.lab.springecommerce.dto.RouteResponse;
import com.lab.springecommerce.model.Customer;
import com.lab.springecommerce.model.Route;
import com.lab.springecommerce.model.UserRole;
import com.lab.springecommerce.repository.CustomerRepository;
import com.lab.springecommerce.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public RouteResponse createRoute(String driverName, RouteRequest request) {
        validateRouteRequest(request);

        Customer driver = customerRepository.findByName(driverName)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        if (driver.getRole() != UserRole.DRIVER) {
            throw new RuntimeException("Only drivers can create routes");
        }

        Route route = new Route();
        route.setDriver(driver);
        route.setStartPoint(request.getStartPoint().trim());
        route.setEndPoint(request.getEndPoint().trim());
        route.setDistance(request.getDistance());
        route.setEstimatedDuration(request.getEstimatedDuration());

        route = routeRepository.save(route);

        return mapToResponse(route);
    }

    public List<RouteResponse> getMyRoutes(String driverName) {
        return routeRepository.findByDriverName(driverName).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public RouteResponse getRouteById(Long id) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found"));
        return mapToResponse(route);
    }

    @Transactional
    public void deleteRoute(Long id, String driverName) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        if (!route.getDriver().getName().equals(driverName)) {
            throw new RuntimeException("You can only delete your own routes");
        }

        routeRepository.delete(route);
    }

    // Helper methods

    private void validateRouteRequest(RouteRequest request) {
        if (request == null) {
            throw new RuntimeException("Request cannot be null");
        }

        if (request.getStartPoint() == null || request.getStartPoint().trim().isEmpty()) {
            throw new RuntimeException("Start point is required");
        }

        if (request.getEndPoint() == null || request.getEndPoint().trim().isEmpty()) {
            throw new RuntimeException("End point is required");
        }

        if (request.getStartPoint().trim().length() > 255) {
            throw new RuntimeException("Start point must be at most 255 characters");
        }

        if (request.getEndPoint().trim().length() > 255) {
            throw new RuntimeException("End point must be at most 255 characters");
        }

        if (request.getDistance() != null && request.getDistance() <= 0) {
            throw new RuntimeException("Distance must be positive");
        }

        if (request.getEstimatedDuration() != null && request.getEstimatedDuration() <= 0) {
            throw new RuntimeException("Estimated duration must be positive");
        }
    }

    private RouteResponse mapToResponse(Route route) {
        return new RouteResponse(
                route.getId(),
                route.getDriver().getName(),
                route.getStartPoint(),
                route.getEndPoint(),
                route.getDistance(),
                route.getEstimatedDuration(),
                route.getCreatedAt()
        );
    }
}