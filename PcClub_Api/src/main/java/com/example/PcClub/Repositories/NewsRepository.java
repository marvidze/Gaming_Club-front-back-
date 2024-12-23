package com.example.PcClub.Repositories;

import com.example.PcClub.Entities.News;
import com.example.PcClub.Entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends CrudRepository<News, Integer> {
}
