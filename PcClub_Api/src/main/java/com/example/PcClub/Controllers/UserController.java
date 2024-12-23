package com.example.PcClub.Controllers;

import com.example.PcClub.DTOs.UpdateUserDto;
import com.example.PcClub.Entities.User;
import com.example.PcClub.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserDto updateUserDto) {
        return ResponseEntity.ok(userService.updateUser(updateUserDto));
    }

    @GetMapping("/nUsers")
    public ResponseEntity<?> getNUsers(@RequestParam(defaultValue = "1") int n) {
        return ResponseEntity.ok(userService.getNUsers(n));
    }
}
