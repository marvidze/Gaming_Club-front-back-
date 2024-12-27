package com.example.PcClub.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.lang.Nullable;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Data
@Table(name = "slot_reservations")
public class SlotReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Nullable
    @Column(name = "date")
    private String date;

    @Nullable
    @Column(name = "zone")
    private String zone;

}
