package com.lab.springecommerce.service;

/*
    @project   spring-ecommerce
    @class     DataSeeder
    @version   1.0.0
    @since     12/16/2025 - 20:23
*/

import com.lab.springecommerce.model.Customer;
import com.lab.springecommerce.model.UserRole;
import com.lab.springecommerce.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DataSeeder {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String seedData() {
        StringBuilder result = new StringBuilder();

        try {
            // Створюємо тестових водіїв
            createDriverIfNotExists("driver1", "driver1@example.com", "+380501111111", "driver123", result);
            createDriverIfNotExists("driver2", "driver2@example.com", "+380502222222", "driver123", result);
            createDriverIfNotExists("driver3", "driver3@example.com", "+380503333333", "driver123", result);

            // Створюємо тестових попутників
            createPassengerIfNotExists("passenger1", "passenger1@example.com", "+380504444444", "passenger123", result);
            createPassengerIfNotExists("passenger2", "passenger2@example.com", "+380505555555", "passenger123", result);
            createPassengerIfNotExists("passenger3", "passenger3@example.com", "+380506666666", "passenger123", result);

            result.append("\n🎉 Data seeding completed successfully!\n");
            result.append("📊 Total users: ").append(customerRepository.count()).append("\n");
            result.append("🚗 Drivers: ").append(countByRole(UserRole.DRIVER)).append("\n");
            result.append("🧍 Passengers: ").append(countByRole(UserRole.PASSENGER)).append("\n");

        } catch (Exception e) {
            result.append("❌ Error during seeding: ").append(e.getMessage()).append("\n");
        }

        return result.toString();
    }

    @Transactional
    public String clearData() {
        StringBuilder result = new StringBuilder();

        try {
            long usersCount = customerRepository.count();

            // Видаляємо всіх користувачів
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

    // Helper methods

    private void createDriverIfNotExists(String name, String email, String phone, String password, StringBuilder result) {
        if (!customerRepository.existsByEmail(email)) {
            Customer driver = new Customer();
            driver.setName(name);
            driver.setEmail(email);
            driver.setPhone(phone);
            driver.setPassword(passwordEncoder.encode(password));
            driver.setRole(UserRole.DRIVER);
            customerRepository.save(driver);
            result.append("✅ Created driver: ").append(name).append(" (").append(email).append(")\n");
        } else {
            result.append("ℹ️ Driver already exists: ").append(name).append("\n");
        }
    }

    private void createPassengerIfNotExists(String name, String email, String phone, String password, StringBuilder result) {
        if (!customerRepository.existsByEmail(email)) {
            Customer passenger = new Customer();
            passenger.setName(name);
            passenger.setEmail(email);
            passenger.setPhone(phone);
            passenger.setPassword(passwordEncoder.encode(password));
            passenger.setRole(UserRole.PASSENGER);
            customerRepository.save(passenger);
            result.append("✅ Created passenger: ").append(name).append(" (").append(email).append(")\n");
        } else {
            result.append("ℹ️ Passenger already exists: ").append(name).append("\n");
        }
    }

    private long countByRole(UserRole role) {
        return customerRepository.findAll().stream()
                .filter(customer -> customer.getRole() == role)
                .count();
    }
}
