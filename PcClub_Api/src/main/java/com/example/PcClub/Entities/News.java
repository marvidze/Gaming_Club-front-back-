package com.example.PcClub.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;
}
