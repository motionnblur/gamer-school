package com.example.server.repository;

import com.example.server.entity.MasterEntity;
import com.example.server.entity.UploadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadEntityRepository extends JpaRepository<UploadEntity, Long> {
}
