package com.example.PcClub.Services;

import com.example.PcClub.DTOs.RegistrationUserDto;
import com.example.PcClub.DTOs.UpdateUserDto;
import com.example.PcClub.Entities.Role;
import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Repositories.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    @PersistenceContext
    private EntityManager entityManager;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }
    public Optional<User> getUserById(Integer id) {
        return userRepository.getUserById(id);
    }
    public List<User> findFirstNByIdOrderByIdAsc(int n) { return userRepository.findFirstNByIdOrderByIdAsc(n); }
    //public String getProfileIconUrlByLogin(String login) { return userRepository.getProfileIconUrlByLogin(login); }

    @Transactional
    public Optional<User> deleteUser(int id) { return userRepository.deleteUserById(id); }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = findByLogin(login).orElseThrow(() -> new UsernameNotFoundException(
                String.format("Пользователь c логином '%s' не найден", login)
        ));
        return new org.springframework.security.core.userdetails.User(
                user.getLogin(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList())
        );
    }

    @Transactional
    public User createNewUser(RegistrationUserDto registrationUserDto) {
        User user = new User();
        user.setLogin(registrationUserDto.getLogin());
        user.setPassword(passwordEncoder.encode(registrationUserDto.getPassword()));
        user.setRoles(List.of(roleService.getUserRole()));
        return userRepository.save(user);
    }

    public List<UpdateUserDto> getNUsers(int n) {
        List<User> dbUsers = findFirstNByIdOrderByIdAsc(n);
        List<UpdateUserDto> outUsers = new ArrayList<>();

        for (User user : dbUsers) {
            outUsers.add(new UpdateUserDto(
                    user.getId(),
                    user.getLogin(),
                    user.getRoles().stream().map(Role::getRole).map(role -> role.replaceAll("ROLE_|_user", "").toLowerCase())
                            .collect(Collectors.joining(", ")),
                    user.getProfile_icon_url()
            ));
        }

        return outUsers;
    }

    @Transactional
    public ResponseEntity<?> updateUser(UpdateUserDto updateUserDto) {
        User user = getUserById(updateUserDto.getId()).orElseThrow(()-> new UsernameNotFoundException(
                String.format("Пользователь '%s' не найден", updateUserDto.getId())
        ));

        if (updateUserDto.getLogin() != null) {
            user.setLogin(updateUserDto.getLogin());
        }

        if (updateUserDto.getProfile_icon_url() != null) {
            user.setProfile_icon_url(updateUserDto.getProfile_icon_url());
        }

        if (updateUserDto.getRole() != null && !updateUserDto.getRole().isEmpty()) {
            user.getRoles().clear();
            switch (updateUserDto.getRole().replaceAll("ROLE_|_user", "").toLowerCase()) {
                case "moderator":
                    user.setRoles(List.of(roleService.getUserRoleModerator()));
                    break;
                case "admin":
                    user.setRoles(List.of(roleService.getUserRoleAdmin()));
                    break;
                case "common":
                    user.setRoles(List.of(roleService.getUserRole()));
                    break;
                default:
                    return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
                            "Несуществующая роль: " + updateUserDto.getRole()), HttpStatus.BAD_REQUEST);
            }
            entityManager.detach(user);
        }
        return ResponseEntity.ok(String.format("Пользователь '%s' изменён", userRepository.save(user).getId()));
    }
}
