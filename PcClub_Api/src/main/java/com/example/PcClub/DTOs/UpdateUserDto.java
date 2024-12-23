package com.example.PcClub.DTOs;

import com.example.PcClub.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateUserDto {
    private Integer id;
    private String login;
    private String role;
    private String profile_icon_url;
}
