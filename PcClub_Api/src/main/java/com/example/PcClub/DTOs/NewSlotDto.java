package com.example.PcClub.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Data
public class NewSlotDto {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private Date date;
    private String zone;
}
