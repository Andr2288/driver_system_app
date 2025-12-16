package com.lab.springecommerce.repository;

/*
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

    List<Route> findByDriver(Customer driver);

    List<Route> findByDriverName(String driverName);

    List<Route> findByStartPointContainingIgnoreCase(String startPoint);

    List<Route> findByEndPointContainingIgnoreCase(String endPoint);

    List<Route> findByStartPointContainingIgnoreCaseAndEndPointContainingIgnoreCase(String startPoint, String endPoint);
}
