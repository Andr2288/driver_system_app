package com.lab.springecommerce.service;

/*
    @project   spring-ecommerce
    @class     TripService
    @version   1.0.0
    @since     12/16/2025 - 21:21
*/

import com.lab.springecommerce.dto.TripRequest;
import com.lab.springecommerce.dto.TripResponse;
import com.lab.springecommerce.model.*;
import com.lab.springecommerce.repository.CustomerRepository;
import com.lab.springecommerce.repository.RouteRepository;
import com.lab.springecommerce.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public TripResponse createTrip(String driverName, TripRequest request) {
        // Валідація
        validateTripRequest(request);

        // Знайти водія
        Customer driver = customerRepository.findByName(driverName)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        // Перевірити що це водій
        if (driver.getRole() != UserRole.DRIVER) {
            throw new RuntimeException("Only drivers can create trips");
        }

        // Знайти маршрут
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route not found"));

        // Перевірити що це маршрут цього водія
        if (!route.getDriver().getName().equals(driverName)) {
            throw new RuntimeException("You can only create trips for your own routes");
        }

        // Створити рейс
        Trip trip = new Trip();
        trip.setRoute(route);
        trip.setDriver(driver);
        trip.setDepartureDateTime(request.getDepartureDateTime());
        trip.setAvailableSeats(request.getAvailableSeats());
        trip.setPricePerSeat(request.getPricePerSeat());
        trip.setStatus(TripStatus.PLANNED);

        trip = tripRepository.save(trip);

        return mapToResponse(trip);
    }

    @Transactional
    public TripResponse updateTrip(Long id, String driverName, TripRequest request) {
        // Валідація
        validateTripRequest(request);

        // Знайти рейс
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Перевірити що це рейс цього водія
        if (!trip.getDriver().getName().equals(driverName)) {
            throw new RuntimeException("You can only update your own trips");
        }

        // Перевірити статус (можна редагувати тільки заплановані)
        if (trip.getStatus() != TripStatus.PLANNED) {
            throw new RuntimeException("You can only update planned trips");
        }

        // Оновити дані
        trip.setDepartureDateTime(request.getDepartureDateTime());
        trip.setAvailableSeats(request.getAvailableSeats());
        trip.setPricePerSeat(request.getPricePerSeat());

        trip = tripRepository.save(trip);

        return mapToResponse(trip);
    }

    @Transactional
    public void deleteTrip(Long id, String driverName) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Перевірити що це рейс цього водія
        if (!trip.getDriver().getName().equals(driverName)) {
            throw new RuntimeException("You can only delete your own trips");
        }

        tripRepository.delete(trip);
    }

    public List<TripResponse> getMyTrips(String driverName) {
        return tripRepository.findByDriverName(driverName).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TripResponse getTripById(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        return mapToResponse(trip);
    }

    // Для попутників
    public List<TripResponse> getAllAvailableTrips() {
        return tripRepository.findAvailableTrips(LocalDateTime.now()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TripResponse> searchTrips(String startPoint, String endPoint) {
        return tripRepository.searchTrips(startPoint, endPoint, LocalDateTime.now()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Helper methods

    private void validateTripRequest(TripRequest request) {
        if (request == null) {
            throw new RuntimeException("Request cannot be null");
        }

        if (request.getRouteId() == null) {
            throw new RuntimeException("Route ID is required");
        }

        if (request.getDepartureDateTime() == null) {
            throw new RuntimeException("Departure date time is required");
        }

        if (request.getDepartureDateTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Departure date time must be in the future");
        }

        if (request.getAvailableSeats() == null || request.getAvailableSeats() <= 0) {
            throw new RuntimeException("Available seats must be positive");
        }

        if (request.getAvailableSeats() > 8) {
            throw new RuntimeException("Available seats must be at most 8");
        }

        if (request.getPricePerSeat() == null) {
            throw new RuntimeException("Price per seat is required");
        }

        if (request.getPricePerSeat().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Price per seat must be positive");
        }
    }

    private TripResponse mapToResponse(Trip trip) {
        return new TripResponse(
                trip.getId(),
                trip.getRoute().getId(),
                trip.getRoute().getStartPoint(),
                trip.getRoute().getEndPoint(),
                trip.getDriver().getName(),
                trip.getDepartureDateTime(),
                trip.getAvailableSeats(),
                trip.getPricePerSeat(),
                trip.getStatus(),
                trip.getCreatedAt()
        );
    }
}