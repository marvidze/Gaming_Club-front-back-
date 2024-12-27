package com.example.PcClub.Services;

import com.example.PcClub.DTOs.NewSlotDto;
import com.example.PcClub.Entities.SlotReservation;
import com.example.PcClub.Repositories.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotService {
    private final SlotRepository slotRepository;

    public List<SlotReservation> getAllSlotSlotReservation() { return slotRepository.findAll(); }

    public SlotReservation addNewSlot(NewSlotDto slotDto) {
        SlotReservation slot = new SlotReservation();

        slot.setDate(slotDto.getDate());
        slot.setZone(slotDto.getZone());

        return slotRepository.save(slot);
    }
}
