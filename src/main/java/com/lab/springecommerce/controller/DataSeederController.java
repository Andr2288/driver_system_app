package com.lab.springecommerce.controller;

/*
    @class     DataSeederController
    @version   1.0.0
    @since     12/16/2025 - 20:48
*/

import com.lab.springecommerce.service.DataSeeder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/seed")
@CrossOrigin(origins = "http://localhost:5173")
public class DataSeederController {

    @Autowired
    private DataSeeder dataSeeder;

    @PostMapping("/run")
    public ResponseEntity<String> seedData() {
        try {
            String result = dataSeeder.seedData();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/clear")
    public ResponseEntity<String> clearData() {
        try {
            String result = dataSeeder.clearData();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetData() {
        try {
            String result = dataSeeder.resetData();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Seeder endpoints available:\n" +
                "POST /api/admin/seed/run - Create test users (3 drivers + 3 passengers)\n" +
                "POST /api/admin/seed/clear - Delete all users\n" +
                "POST /api/admin/seed/reset - Clear + Seed\n" +
                "GET /api/admin/seed/status - This message");
    }
}
