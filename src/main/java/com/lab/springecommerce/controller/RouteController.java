package com.lab.springecommerce.controller;

/*
    @class     RouteController
    @version   1.0.0
    @since     12/16/2025 - 22:25
*/

import com.lab.springecommerce.dto.RouteRequest;
import com.lab.springecommerce.dto.RouteResponse;
import com.lab.springecommerce.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @PostMapping
    public ResponseEntity<RouteResponse> createRoute(@RequestBody RouteRequest request) {
        String driverName = getCurrentUsername();
        RouteResponse response = routeService.createRoute(driverName, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<List<RouteResponse>> getMyRoutes() {
        String driverName = getCurrentUsername();
        List<RouteResponse> routes = routeService.getMyRoutes(driverName);
        return ResponseEntity.ok(routes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RouteResponse> getRouteById(@PathVariable Long id) {
        RouteResponse route = routeService.getRouteById(id);
        return ResponseEntity.ok(route);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        String driverName = getCurrentUsername();
        routeService.deleteRoute(id, driverName);
        return ResponseEntity.noContent().build();
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        return authentication.getName();
    }
}
