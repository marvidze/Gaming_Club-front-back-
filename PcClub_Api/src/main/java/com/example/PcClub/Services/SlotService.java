package com.example.PcClub.Services;

import com.example.PcClub.DTOs.NewSlotDto;
import com.example.PcClub.DTOs.SlotResponseDto;
import com.example.PcClub.Entities.SlotReservation;
import com.example.PcClub.Repositories.SlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotService {
    private final SlotRepository slotRepository;

    public List<SlotReservation> getAllSlotSlotReservation() { return slotRepository.findAll(); }
    public List<SlotResponseDto> getSlotsByZone(String zone) {
        List<SlotReservation> slots = slotRepository.findByZone(zone);
        List<SlotResponseDto> slotsDto = new ArrayList<>();

        for (SlotReservation slot : slots) {
            String[] dateTime = slot.getDate().toString().split(" ");
            String date = dateTime[0];
            String time = dateTime[1];

            slotsDto.add(new SlotResponseDto(
                    date,
                    time
            ));
        }

        return slotsDto;
    };

    public SlotReservation addNewSlot(NewSlotDto slotDto) {
        SlotReservation slot = new SlotReservation();

        slot.setDate(slotDto.getDate());
        slot.setZone(slotDto.getZone());

        return slotRepository.save(slot);
    }
}
