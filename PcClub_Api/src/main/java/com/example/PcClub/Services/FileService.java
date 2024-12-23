package com.example.PcClub.Services;

import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private final UserRepository userRepository;
    @Value("${upload.path}")
    private String uploadPath;

    @Transactional
    public ResponseEntity<?> uploadFile(MultipartFile file, String login) throws IOException {
        if (file == null) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),
                    "Ошибка отправки файла"), HttpStatus.BAD_REQUEST);
        }

        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        User user = userRepository.findByLogin(login).orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        if (user.getProfile_icon_url() != null) {
            File userIcon = new File(uploadDir, user.getProfile_icon_url());

            if (userIcon.exists()) {
                userIcon.delete();
            }
            user.setProfile_icon_url(null);
        }

        try (InputStream inputStream = file.getInputStream()) {
            String uuidFile = UUID.randomUUID().toString();
            String fileName = uuidFile + "." + file.getOriginalFilename();
            File outputFile = new File(uploadDir, fileName);

            try (FileOutputStream outputStream = new FileOutputStream(outputFile)) {
                Streams.copy(inputStream, outputStream, true);
            }
            user.setProfile_icon_url(fileName);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(uploadPath + "\\" + user.getProfile_icon_url());
    }
}
