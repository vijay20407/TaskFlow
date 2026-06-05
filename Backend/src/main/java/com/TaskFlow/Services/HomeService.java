package com.TaskFlow.Services;

import com.TaskFlow.DTO.Course;
import com.TaskFlow.Entity.Users;
import com.TaskFlow.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HomeService {
    @Autowired
    UserRepository userRepository;

    public void addCourse(Course course){
        Optional<Users> user = userRepository.findByUsername(course.getUsername());
        System.out.println(course.getUsername()+" "+course.getCourseName()+" "+course.getCourseDetails());
        if(user.isPresent()){
            user.get().addCourse(course.getCourseName(), course.getCourseDetails());
            userRepository.save(user.get());
        }
        else{
            System.out.println("not found");
        }
    }
}
