package com.TaskFlow.Services;

import com.TaskFlow.DTO.Course;
import com.TaskFlow.Entity.Users;
import com.TaskFlow.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class HomeService {
    @Autowired
    UserRepository userRepository;

    public void addCourse(Course course){
        Optional<Users> user = userRepository.findByUsername(course.getUsername());
        if(user.isPresent()){
            Map<String,String> updatedCourseMap = user.get().getCourseMap();
            updatedCourseMap.put(course.getCourseName(), course.getCourseDetails());
            user.get().setCourseMap(updatedCourseMap);
            userRepository.save(user.get());
        }
        else{
            System.out.println("not found");
        }
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
}
