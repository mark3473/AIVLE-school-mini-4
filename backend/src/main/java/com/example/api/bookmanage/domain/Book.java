package com.example.api.bookmanage.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 45)
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column()
    private String summary;

    @Column()
    private String coverImg;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public enum Genre{
        FANTASY, SF, ROMANCE, MYSTERY, THRILLER, ESSAY, BUSINESS, SCIENCE, ART
    }

    @Column(length = 45)
    private String publisher;

    @Column()
    private String coverImg;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    public enum Genre{
        FANTASY, SF, THRILLER, ROMANCE, MYSTERY, ESSAY, HISTORY
    }
//    @Column(length = 45)
//    private String publisher;
//
//    @Enumerated(EnumType.STRING)
//    private Status status;
//
//    public enum Status{
//        BORROWED, AVAILABLE
//    }
}
