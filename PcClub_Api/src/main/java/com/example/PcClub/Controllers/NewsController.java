package com.example.PcClub.Controllers;

import com.example.PcClub.DTOs.NewsDto;
import com.example.PcClub.Entities.News;
import com.example.PcClub.Exceptions.AppError;
import com.example.PcClub.Services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;

    @GetMapping("/getNewsById")
    public ResponseEntity<?> getNewById(@RequestParam Integer id) {
        return ResponseEntity.ok(newsService.findById(id));
    }

    @GetMapping("/getNLastNews")
    public ResponseEntity<?> getNNews(@RequestParam int n) {
        return ResponseEntity.ok(newsService.findFirstNByIdOrderByIdDesc(n));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody NewsDto newsDto) {
        return ResponseEntity.ok(newsService.updateNews(newsDto));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam int id) {
        Optional<News> news = newsService.deleteNews(id);

        if (!news.isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.NOT_FOUND.value(),
                    "Новость не найдена!"), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(String.format("Новость c id - %d была удалена", id));
    }
}
