package com.example.PcClub.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;


@Data
public class NewSlotDto {
    private String date;
    private String zone;
}
