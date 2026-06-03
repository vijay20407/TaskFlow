package com.TaskFlow.Controller;

import com.TaskFlow.Entity.Users;
import com.TaskFlow.Entity.UsersLogin;
import com.TaskFlow.Repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/login")
public class LoginController
{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> checkLogin(Authentication authentication) {
        System.out.println(authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).header("message","Login Successful").body(authentication.getName());
    }
    @PatchMapping("/reset-password")
    @Transactional
    public ResponseEntity<String> resetPassword(@RequestBody UsersLogin usersLogin) {
        Optional<Users> users = userRepository.findByEmail(usersLogin.getEmail());

        if(users.isPresent()){
            users.get().setPassword(passwordEncoder.encode(usersLogin.getPassword()));
            return ResponseEntity.status(HttpStatus.OK).header("message","Reset Password Successful").body("Reset Password Successful");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
