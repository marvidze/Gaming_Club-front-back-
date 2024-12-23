package com.example.PcClub.Repositories;

import com.example.PcClub.Entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByLogin(String login);
    Optional<User> getUserById(Integer id);
    Optional<User> deleteUserById(int id);

    @Query("SELECT u FROM User u ORDER BY u.id ASC LIMIT :n")
    List<User> findFirstNByIdOrderByIdAsc(int n);
}
