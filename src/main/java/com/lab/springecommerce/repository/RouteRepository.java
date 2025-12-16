package com.lab.springecommerce.repository;

/*
    @project   spring-ecommerce
    @class     RouteRepository
    @version   1.0.0
    @since     12/16/2025 - 21:09
*/

import com.lab.springecommerce.model.Customer;
import com.lab.springecommerce.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    // Знайти всі маршрути водія
    List<Route> findByDriver(Customer driver);

    // Знайти всі маршрути водія за іменем
    List<Route> findByDriverName(String driverName);

    // Знайти маршрути за початковою точкою
    List<Route> findByStartPointContainingIgnoreCase(String startPoint);

    // Знайти маршрути за кінцевою точкою
    List<Route> findByEndPointContainingIgnoreCase(String endPoint);

    // Знайти маршрути за початковою та кінцевою точкою
    List<Route> findByStartPointContainingIgnoreCaseAndEndPointContainingIgnoreCase(String startPoint, String endPoint);
}
