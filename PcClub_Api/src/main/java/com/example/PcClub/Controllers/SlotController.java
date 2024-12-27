package com.example.PcClub.Controllers;

import com.example.PcClub.DTOs.NewSlotDto;
import com.example.PcClub.Repositories.SlotRepository;
import com.example.PcClub.Services.SlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/slots")
public class SlotController {
    private final SlotService slotService;

    @PostMapping("/addSlot")
    public ResponseEntity<?> addSlot(@RequestBody NewSlotDto slotDto) {
        return ResponseEntity.ok(slotService.addNewSlot(slotDto));
    }

    @GetMapping("/all")
    public ResponseEntity<?> allSlots() {
        return ResponseEntity.ok(slotService.getAllSlotSlotReservation());
    }
}
