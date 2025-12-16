package com.lab.springecommerce.repository;

/*
    @project   spring-ecommerce
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

    // Знайти всі рейси водія
    List<Trip> findByDriver(Customer driver);

    // Знайти всі рейси водія за іменем
    List<Trip> findByDriverName(String driverName);

    // Знайти рейси за маршрутом
    List<Trip> findByRoute(Route route);

    // Знайти рейси за статусом
    List<Trip> findByStatus(TripStatus status);

    // Знайти рейси з доступними місцями
    List<Trip> findByAvailableSeatsGreaterThan(Integer seats);

    // Знайти майбутні рейси (дата відправлення в майбутньому)
    List<Trip> findByDepartureDateTimeAfter(LocalDateTime dateTime);

    // Знайти рейси за початковою та кінцевою точкою (через Join з Route)
    @Query("SELECT t FROM Trip t WHERE " +
            "LOWER(t.route.startPoint) LIKE LOWER(CONCAT('%', :startPoint, '%')) AND " +
            "LOWER(t.route.endPoint) LIKE LOWER(CONCAT('%', :endPoint, '%'))")
    List<Trip> findByStartAndEndPoint(@Param("startPoint") String startPoint,
                                      @Param("endPoint") String endPoint);

    // Знайти доступні рейси (статус PLANNED, є місця, дата в майбутньому)
    @Query("SELECT t FROM Trip t WHERE " +
            "t.status = 'PLANNED' AND " +
            "t.availableSeats > 0 AND " +
            "t.departureDateTime > :now")
    List<Trip> findAvailableTrips(@Param("now") LocalDateTime now);

    // Пошук рейсів з фільтрами
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
