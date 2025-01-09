package com.example.PcClub.Controllers;

import com.example.PcClub.DTOs.UpdateUserDto;
import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam int id) {
        Optional<User> user = userService.deleteUser(id);

        if (!user.isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.NOT_FOUND.value(),
                    "Пользователь не удалён!"), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(String.format("Пользовател c id - %d был удалён", id));
    }
}
