package com.TaskFlow.Controller;

import com.TaskFlow.DTO.Course;
import com.TaskFlow.DTO.EditCourseMap;
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
    public ResponseEntity<String> addCourse(@RequestBody Course course,Authentication authentication){

        return homeService.addCourse(course,authentication);
    }
    @GetMapping("/get-courses")
    public ResponseEntity<List<String>> getCourseList(Authentication authentication){
        List<String> courses = homeService.getCourses(authentication.getName());
        return ResponseEntity.ok().body(courses);
    }
    @DeleteMapping("/delete-course")
    public ResponseEntity<String> deleteCourse(@RequestBody Course course,Authentication authentication){
        homeService.deleteCourse(authentication.getName(), course.getCourseName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/get-courseMap")
    public ResponseEntity<Map<String, String>> getCourseMap(Authentication authentication){
        return ResponseEntity.status(HttpStatus.OK).body(homeService.getCourseMap(authentication.getName()));
    }
    @PatchMapping("/edit-courseMap")
    public ResponseEntity<String> editCourseMap(@RequestBody EditCourseMap editCourseMap,Authentication authentication){
        return homeService.editCourseMap(editCourseMap,authentication);
    }
}
