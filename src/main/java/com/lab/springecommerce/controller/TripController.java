package com.lab.springecommerce.controller;

/*
    @project   spring-ecommerce
    @class     TripController
    @version   1.0.0
    @since     12/16/2025 - 22:26
*/

import com.lab.springecommerce.dto.TripRequest;
import com.lab.springecommerce.dto.TripResponse;
import com.lab.springecommerce.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    @Autowired
    private TripService tripService;

    // ===== DRIVER ENDPOINTS =====

    // Створити рейс (тільки DRIVER)
    @PostMapping
    public ResponseEntity<TripResponse> createTrip(@RequestBody TripRequest request) {
        String driverName = getCurrentUsername();
        TripResponse response = tripService.createTrip(driverName, request);
        return ResponseEntity.ok(response);
    }

    // Редагувати рейс (тільки DRIVER)
    @PutMapping("/{id}")
    public ResponseEntity<TripResponse> updateTrip(@PathVariable Long id, @RequestBody TripRequest request) {
        String driverName = getCurrentUsername();
        TripResponse response = tripService.updateTrip(id, driverName, request);
        return ResponseEntity.ok(response);
    }

    // Видалити рейс (тільки DRIVER)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        String driverName = getCurrentUsername();
        tripService.deleteTrip(id, driverName);
        return ResponseEntity.noContent().build();
    }

    // Отримати мої рейси (тільки DRIVER)
    @GetMapping("/my")
    public ResponseEntity<List<TripResponse>> getMyTrips() {
        String driverName = getCurrentUsername();
        List<TripResponse> trips = tripService.getMyTrips(driverName);
        return ResponseEntity.ok(trips);
    }

    // ===== PASSENGER ENDPOINTS =====

    // Отримати всі доступні рейси
    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllAvailableTrips() {
        List<TripResponse> trips = tripService.getAllAvailableTrips();
        return ResponseEntity.ok(trips);
    }

    // Пошук рейсів за маршрутом
    @GetMapping("/search")
    public ResponseEntity<List<TripResponse>> searchTrips(
            @RequestParam(required = false) String startPoint,
            @RequestParam(required = false) String endPoint) {
        List<TripResponse> trips = tripService.searchTrips(startPoint, endPoint);
        return ResponseEntity.ok(trips);
    }

    // Отримати рейс за ID
    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long id) {
        TripResponse trip = tripService.getTripById(id);
        return ResponseEntity.ok(trip);
    }

    // Helper method
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        return authentication.getName();
    }
}