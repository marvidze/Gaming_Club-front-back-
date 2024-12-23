package com.example.PcClub.Services;

import com.example.PcClub.DTOs.NewsDto;
import com.example.PcClub.DTOs.UpdateUserDto;
import com.example.PcClub.Entities.News;
import com.example.PcClub.Entities.Role;
import com.example.PcClub.Entities.User;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Repositories.NewsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepository newsRepository;

    public Optional<News> findById(Integer id) { return newsRepository.findById(id); }
    public List<News> findFirstNByIdOrderByIdDesc(int n) { return newsRepository.findFirstNByIdOrderByIdDesc(n); };

    @Transactional
    public Optional<News> deleteNews(int id) { return newsRepository.deleteNewsById(id); }

    public ResponseEntity<?> updateNews(NewsDto dbNews) {
        News news = findById(dbNews.getId()).orElseThrow(()-> new UsernameNotFoundException(
                String.format("Новость '%s' не найдена", dbNews.getId())
        ));

        if (dbNews.getTitle() != null) {
            news.setTitle(dbNews.getTitle());
        }

        if (dbNews.getBody() != null) {
            news.setBody(dbNews.getBody());
        }

        return ResponseEntity.ok(String.format("Новость '%s' изменена", newsRepository.save(news).getId()));
    }
}
