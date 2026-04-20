package com.fsd.exp5.repository;

import com.fsd.exp5.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
