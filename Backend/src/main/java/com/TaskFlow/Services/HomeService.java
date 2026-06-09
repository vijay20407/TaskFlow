package com.TaskFlow.Services;

import com.TaskFlow.DTO.Course;
import com.TaskFlow.Entity.Users;
import com.TaskFlow.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class HomeService {
    @Autowired
    UserRepository userRepository;

    public ResponseEntity<String> addCourse(Course course){
        Optional<Users> user = userRepository.findByUsername(course.getUsername());
        if(user.isPresent()){
            Map<String,String> updatedCourseMap = user.get().getCourseMap();
            if(!updatedCourseMap.containsKey(course.getCourseName()))updatedCourseMap.put(course.getCourseName(), course.getCourseDetails());
            else return ResponseEntity.status(HttpStatus.CONFLICT).body("Course already exists");

            user.get().setCourseMap(updatedCourseMap);
            userRepository.save(user.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

    }

    public List<String> getCourses(String username) {
        Optional<Users> user = userRepository.findByUsername(username);
        return user.map(users -> users.getCourseMap().keySet().stream().toList()).orElse(null);
    }
    public void deleteCourse(String username,String courseName){
        Optional<Users> user = userRepository.findByUsername(username);
        System.out.println(user);
        if(user.isPresent()){
            Map<String,String> updatedCourseMap = user.get().getCourseMap();
            updatedCourseMap.remove(courseName);
            System.out.println(updatedCourseMap);
            user.get().setCourseMap(updatedCourseMap);
            userRepository.save(user.get());
        }
    }
    public Map<String,String> getCourseMap(String username){
        Optional<Users> user = userRepository.findByUsername(username);
        return user.map(Users::getCourseMap).orElse(null);
    }
}
