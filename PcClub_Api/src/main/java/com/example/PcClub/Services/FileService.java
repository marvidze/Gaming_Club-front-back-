package com.example.PcClub.Services;

import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private final UserRepository userRepository;
    @Value("${upload.path}")
    private String uploadPath;

    @Transactional
    public ResponseEntity<?> uploadFile(MultipartFile file, UserDetails userDetails) throws IOException {
        if (file == null) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
                    "Ошибка отправки файла"), HttpStatus.BAD_REQUEST);
        }

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        String uuidFile = UUID.randomUUID().toString();
        String fileName = uuidFile + "." + file.getOriginalFilename();

        file.transferTo(new File(uploadPath + "/" + fileName));

        User user = userRepository.findByLogin(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        user.setProfile_icon_url(fileName);

        return ResponseEntity.ok(fileName);
    }
}
