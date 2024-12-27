package com.example.PcClub.Services;

import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {
    private final UserRepository userRepository;
    @Value("${upload.path}")
    private String uploadPath;

    public ResponseEntity<?> downloadFile(String file) throws IOException {
        File  imgFile = new File (uploadPath + "/" + file);

        byte[] bytes = StreamUtils.copyToByteArray(new FileInputStream(imgFile));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentLength(imgFile.length());

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }

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

        return ResponseEntity.ok(user.getProfile_icon_url());
    }
}
