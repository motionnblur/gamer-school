package com.example.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "master_entity")
public class MasterEntity {

    @Id
    @Column(name = "master_entity_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "master_id", unique = true, nullable = false)
    private String masterId;

    @Column(name = "master_password", nullable = false)
    private String masterPassword;

    @Column(name = "master_mail", unique = true, nullable = false)
    private String masterMail;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "master_entity_id", referencedColumnName = "master_entity_id")
    private List<UploadEntity> uploads;
}
