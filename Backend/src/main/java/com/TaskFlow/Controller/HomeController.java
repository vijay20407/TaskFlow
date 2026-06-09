package com.TaskFlow.Controller;

import com.TaskFlow.DTO.Course;
import com.TaskFlow.Services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    HomeService homeService;
    @PostMapping("/add-course")
    public ResponseEntity<String> addCourse(@RequestBody Course course){

        return homeService.addCourse(course);
    }
    @GetMapping("/get-courses")
    public ResponseEntity<List<String>> getCourseList(@RequestParam String username){
        List<String> courses = homeService.getCourses(username);
        return ResponseEntity.ok().body(courses);
    }
    @DeleteMapping("/delete-course")
    public ResponseEntity<String> deleteCourse(@RequestBody Course course){
        homeService.deleteCourse(course.getUsername(), course.getCourseName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/get-courseMap")
    public ResponseEntity<Map<String, String>> getCourseMap(@RequestParam String username){
        return ResponseEntity.status(HttpStatus.OK).body(homeService.getCourseMap(username));
    }
}
