package com.fsd.exp5.service;

import com.fsd.exp5.entity.Student;
import com.fsd.exp5.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    private final StudentRepository repository;
    
    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Optional<Student> getStudentById(@NonNull Long id) {
        return repository.findById(id);
    }

    public Student createStudent(@NonNull Student student) {
        return repository.save(student);
    }

    public Student updateStudent(@NonNull Long id, @NonNull Student studentDetails) {
        return repository.findById(id).map(student -> {
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            student.setCourse(studentDetails.getCourse());
            return repository.save(student);
        }).orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    public void deleteStudent(@NonNull Long id) {
        if(repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Student not found with id " + id);
        }
    }
}
