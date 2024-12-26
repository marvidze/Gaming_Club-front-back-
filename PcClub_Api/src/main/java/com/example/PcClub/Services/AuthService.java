package com.example.PcClub.Services;

import com.example.PcClub.DTOs.JwtRequest;
import com.example.PcClub.DTOs.JwtResponse;
import com.example.PcClub.DTOs.RegistrationUserDto;
import com.example.PcClub.DTOs.UserDto;
import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequest.getLogin(), authRequest.getPassword()
                    ));
        } catch (BadCredentialsException ex) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(),
                    "Неправильный логин или пароль"), HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = userService.loadUserByUsername(authRequest.getLogin());
        User user = userService.findByLogin(userDetails.getUsername()).orElseThrow(()-> new UsernameNotFoundException(
                String.format("Пользователь '%s' не найден")));
        String token = jwtTokenUtils.generateToken(userDetails, user);

        return ResponseEntity.ok(new JwtResponse(HttpStatus.OK.value(), token));
    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        if (userService.findByLogin(registrationUserDto.getLogin()).isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
                    "Пользователь с указанным именем уже существует"), HttpStatus.BAD_REQUEST);
        }
        User user = userService.createNewUser(registrationUserDto);

        return ResponseEntity.ok(
                new UserDto(
                        user.getId(),
                        user.getLogin()
                ));
    }
}
