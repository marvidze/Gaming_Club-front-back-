package com.example.PcClub.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class JwtResponse {
    private int status;
    private String token;
}
