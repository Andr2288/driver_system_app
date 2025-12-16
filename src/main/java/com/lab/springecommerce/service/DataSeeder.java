package com.lab.springecommerce.service;

/*
    @project   spring-ecommerce
    @class     DataSeeder
    @version   1.0.0
    @since     12/16/2025 - 20:23
*/

import com.lab.springecommerce.model.*;
import com.lab.springecommerce.repository.CustomerRepository;
import com.lab.springecommerce.repository.RouteRepository;
import com.lab.springecommerce.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataSeeder {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String seedData() {
        StringBuilder result = new StringBuilder();

        try {
            result.append("🌱 Starting data seeding...\n\n");

            // Створюємо користувачів
            List<Customer> drivers = createDrivers(result);
            List<Customer> passengers = createPassengers(result);

            // Створюємо маршрути
            List<Route> routes = createRoutes(drivers, result);

            // Створюємо рейси
            createTrips(routes, result);

            result.append("\n🎉 Data seeding completed successfully!\n");
            result.append("═".repeat(50)).append("\n");
            result.append("📊 Statistics:\n");
            result.append("👥 Total users: ").append(customerRepository.count()).append("\n");
            result.append("🚗 Drivers: ").append(countByRole(UserRole.DRIVER)).append("\n");
            result.append("🧍 Passengers: ").append(countByRole(UserRole.PASSENGER)).append("\n");
            result.append("📍 Routes: ").append(routeRepository.count()).append("\n");
            result.append("🚙 Trips: ").append(tripRepository.count()).append("\n");
            result.append("═".repeat(50)).append("\n");

        } catch (Exception e) {
            result.append("❌ Error during seeding: ").append(e.getMessage()).append("\n");
            e.printStackTrace();
        }

        return result.toString();
    }

    @Transactional
    public String clearData() {
        StringBuilder result = new StringBuilder();

        try {
            long tripsCount = tripRepository.count();
            long routesCount = routeRepository.count();
            long usersCount = customerRepository.count();

            // Видаляємо в правильному порядку (через foreign keys)
            tripRepository.deleteAll();
            result.append("🗑️ Deleted trips: ").append(tripsCount).append("\n");

            routeRepository.deleteAll();
            result.append("🗑️ Deleted routes: ").append(routesCount).append("\n");

            customerRepository.deleteAll();
            result.append("🗑️ Deleted users: ").append(usersCount).append("\n");

            result.append("\n✅ All data cleared successfully!\n");

        } catch (Exception e) {
            result.append("❌ Error during clearing: ").append(e.getMessage()).append("\n");
        }

        return result.toString();
    }

    public String resetData() {
        StringBuilder result = new StringBuilder();
        result.append(clearData());
        result.append("\n");
        result.append(seedData());
        return result.toString();
    }

    // ===== USER CREATION =====

    private List<Customer> createDrivers(StringBuilder result) {
        result.append("🚗 Creating drivers...\n");
        List<Customer> drivers = new ArrayList<>();

        String[][] driversData = {
                {"driver1", "driver1@example.com", "+380501111111", "driver123"},
                {"driver2", "driver2@example.com", "+380502222222", "driver123"},
                {"driver3", "driver3@example.com", "+380503333333", "driver123"},
                {"driver4", "driver4@example.com", "+380504444444", "driver123"},
                {"driver5", "driver5@example.com", "+380505555555", "driver123"},
                {"driver6", "driver6@example.com", "+380506666666", "driver123"},
                {"driver7", "driver7@example.com", "+380507777777", "driver123"},
                {"driver8", "driver8@example.com", "+380508888888", "driver123"},
                {"driver9", "driver9@example.com", "+380509999999", "driver123"},
                {"driver10", "driver10@example.com", "+380500000000", "driver123"}
        };

        for (String[] data : driversData) {
            Customer driver = createDriverIfNotExists(data[0], data[1], data[2], data[3], result);
            if (driver != null) {
                drivers.add(driver);
            }
        }

        return drivers;
    }

    private List<Customer> createPassengers(StringBuilder result) {
        result.append("\n🧍 Creating passengers...\n");
        List<Customer> passengers = new ArrayList<>();

        String[][] passengersData = {
                {"passenger1", "passenger1@example.com", "+380511111111", "passenger123"},
                {"passenger2", "passenger2@example.com", "+380512222222", "passenger123"},
                {"passenger3", "passenger3@example.com", "+380513333333", "passenger123"},
                {"passenger4", "passenger4@example.com", "+380514444444", "passenger123"},
                {"passenger5", "passenger5@example.com", "+380515555555", "passenger123"},
                {"passenger6", "passenger6@example.com", "+380516666666", "passenger123"},
                {"passenger7", "passenger7@example.com", "+380517777777", "passenger123"},
                {"passenger8", "passenger8@example.com", "+380518888888", "passenger123"},
                {"passenger9", "passenger9@example.com", "+380519999999", "passenger123"},
                {"passenger10", "passenger10@example.com", "+380510000000", "passenger123"}
        };

        for (String[] data : passengersData) {
            Customer passenger = createPassengerIfNotExists(data[0], data[1], data[2], data[3], result);
            if (passenger != null) {
                passengers.add(passenger);
            }
        }

        return passengers;
    }

    // ===== ROUTE CREATION =====

    private List<Route> createRoutes(List<Customer> drivers, StringBuilder result) {
        result.append("\n📍 Creating routes...\n");
        List<Route> routes = new ArrayList<>();

        String[][] routesData = {
                {"Київ", "Львів", "540.5", "360"},
                {"Харків", "Одеса", "480.0", "320"},
                {"Дніпро", "Запоріжжя", "85.0", "60"},
                {"Київ", "Одеса", "475.0", "315"},
                {"Львів", "Івано-Франківськ", "135.0", "90"},
                {"Харків", "Київ", "480.0", "320"},
                {"Одеса", "Миколаїв", "130.0", "85"},
                {"Київ", "Чернівці", "468.0", "310"},
                {"Львів", "Ужгород", "270.0", "180"},
                {"Дніпро", "Полтава", "215.0", "145"},
                {"Київ", "Вінниця", "268.0", "180"},
                {"Харків", "Полтава", "145.0", "95"}
        };

        int driverIndex = 0;
        for (String[] data : routesData) {
            Customer driver = drivers.get(driverIndex % drivers.size());

            Route route = new Route();
            route.setDriver(driver);
            route.setStartPoint(data[0]);
            route.setEndPoint(data[1]);
            route.setDistance(Double.parseDouble(data[2]));
            route.setEstimatedDuration(Integer.parseInt(data[3]));

            route = routeRepository.save(route);
            routes.add(route);

            result.append("  ✅ Route: ").append(data[0]).append(" → ").append(data[1])
                    .append(" (").append(driver.getName()).append(")\n");

            driverIndex++;
        }

        return routes;
    }

    // ===== TRIP CREATION =====

    private void createTrips(List<Route> routes, StringBuilder result) {
        result.append("\n🚙 Creating trips...\n");

        // Для кожного маршруту створюємо 2-3 рейси
        LocalDateTime now = LocalDateTime.now();

        for (Route route : routes) {
            // Рейс 1: завтра вранці
            createTrip(route, now.plusDays(1).withHour(9).withMinute(0),
                    3, new BigDecimal("300"), result);

            // Рейс 2: післязавтра ввечері
            createTrip(route, now.plusDays(2).withHour(18).withMinute(0),
                    4, new BigDecimal("350"), result);

            // Рейс 3: через 3 дні опівдні (тільки для перших 6 маршрутів)
            if (routes.indexOf(route) < 6) {
                createTrip(route, now.plusDays(3).withHour(12).withMinute(0),
                        2, new BigDecimal("400"), result);
            }
        }
    }

    private void createTrip(Route route, LocalDateTime departureDateTime,
                            Integer seats, BigDecimal price, StringBuilder result) {
        Trip trip = new Trip();
        trip.setRoute(route);
        trip.setDriver(route.getDriver());
        trip.setDepartureDateTime(departureDateTime);
        trip.setAvailableSeats(seats);
        trip.setPricePerSeat(price);
        trip.setStatus(TripStatus.PLANNED);

        trip = tripRepository.save(trip);

        result.append("  ✅ Trip: ").append(route.getStartPoint()).append(" → ")
                .append(route.getEndPoint()).append(" (")
                .append(departureDateTime.toLocalDate()).append(" ")
                .append(departureDateTime.toLocalTime()).append(", ")
                .append(seats).append(" seats, ")
                .append(price).append(" UAH)\n");
    }

    // ===== HELPER METHODS =====

    private Customer createDriverIfNotExists(String name, String email, String phone,
                                             String password, StringBuilder result) {
        if (!customerRepository.existsByEmail(email)) {
            Customer driver = new Customer();
            driver.setName(name);
            driver.setEmail(email);
            driver.setPhone(phone);
            driver.setPassword(passwordEncoder.encode(password));
            driver.setRole(UserRole.DRIVER);
            driver = customerRepository.save(driver);
            result.append("  ✅ ").append(name).append(" (").append(email).append(")\n");
            return driver;
        } else {
            result.append("  ℹ️ ").append(name).append(" already exists\n");
            return customerRepository.findByEmail(email).orElse(null);
        }
    }

    private Customer createPassengerIfNotExists(String name, String email, String phone,
                                                String password, StringBuilder result) {
        if (!customerRepository.existsByEmail(email)) {
            Customer passenger = new Customer();
            passenger.setName(name);
            passenger.setEmail(email);
            passenger.setPhone(phone);
            passenger.setPassword(passwordEncoder.encode(password));
            passenger.setRole(UserRole.PASSENGER);
            passenger = customerRepository.save(passenger);
            result.append("  ✅ ").append(name).append(" (").append(email).append(")\n");
            return passenger;
        } else {
            result.append("  ℹ️ ").append(name).append(" already exists\n");
            return customerRepository.findByEmail(email).orElse(null);
        }
    }

    private long countByRole(UserRole role) {
        return customerRepository.findAll().stream()
                .filter(customer -> customer.getRole() == role)
                .count();
    }
}
