package com.example.PcClub.Repositories;

import com.example.PcClub.DTOs.SlotResponseDto;
import com.example.PcClub.Entities.SlotReservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotRepository extends CrudRepository<SlotReservation, Integer> {
    List<SlotReservation> findAll();
    List<SlotReservation> findByZone(String zone);
}
