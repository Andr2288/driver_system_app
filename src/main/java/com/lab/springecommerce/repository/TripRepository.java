package com.lab.springecommerce.repository;

/*
    @class     TripRepository
    @version   1.0.0
    @since     12/16/2025 - 21:10
*/

import com.lab.springecommerce.model.Customer;
import com.lab.springecommerce.model.Route;
import com.lab.springecommerce.model.Trip;
import com.lab.springecommerce.model.TripStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByDriver(Customer driver);

    List<Trip> findByDriverName(String driverName);

    List<Trip> findByRoute(Route route);

    List<Trip> findByStatus(TripStatus status);

    List<Trip> findByAvailableSeatsGreaterThan(Integer seats);

    List<Trip> findByDepartureDateTimeAfter(LocalDateTime dateTime);

    @Query("SELECT t FROM Trip t WHERE " +
            "LOWER(t.route.startPoint) LIKE LOWER(CONCAT('%', :startPoint, '%')) AND " +
            "LOWER(t.route.endPoint) LIKE LOWER(CONCAT('%', :endPoint, '%'))")
    List<Trip> findByStartAndEndPoint(@Param("startPoint") String startPoint,
                                      @Param("endPoint") String endPoint);

    @Query("SELECT t FROM Trip t WHERE " +
            "t.status = 'PLANNED' AND " +
            "t.availableSeats > 0 AND " +
            "t.departureDateTime > :now")
    List<Trip> findAvailableTrips(@Param("now") LocalDateTime now);

    @Query("SELECT t FROM Trip t WHERE " +
            "(:startPoint IS NULL OR LOWER(t.route.startPoint) LIKE LOWER(CONCAT('%', :startPoint, '%'))) AND " +
            "(:endPoint IS NULL OR LOWER(t.route.endPoint) LIKE LOWER(CONCAT('%', :endPoint, '%'))) AND " +
            "t.status = 'PLANNED' AND " +
            "t.availableSeats > 0 AND " +
            "t.departureDateTime > :now")
    List<Trip> searchTrips(@Param("startPoint") String startPoint,
                           @Param("endPoint") String endPoint,
                           @Param("now") LocalDateTime now);
}
