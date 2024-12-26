package com.example.PcClub.Repositories;

import com.example.PcClub.Entities.News;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsRepository extends CrudRepository<News, Integer> {
    Optional<News> findById(Integer id);
    Optional<News> deleteNewsById(int id);

    @Query("SELECT new FROM News new ORDER BY new.id DESC LIMIT :n")
    List<News> findFirstNByIdOrderByIdDesc(int n);
}
