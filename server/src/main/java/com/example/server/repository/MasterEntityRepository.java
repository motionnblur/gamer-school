package com.example.server.repository;

import com.example.server.entity.MasterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterEntityRepository extends JpaRepository<MasterEntity, Long> {
    MasterEntity findByMasterId(String userMail);
}
