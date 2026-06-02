package com.TaskFlow.Services;

import com.TaskFlow.Entity.Users;
import com.TaskFlow.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Logger;

import static org.springframework.http.ResponseEntity.notFound;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<String> verifyLogin(String email, String password) {
        Optional<Users> users = userRepository.findByEmail(email);

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("message","User not found").body("User Not Found");
        }
        String passwordOriginal = users.get().getPassword();
        if (!passwordEncoder.matches(password, passwordOriginal)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).header("message","Wrong Password").body("Wrong Password");
        }
        return ResponseEntity.status(HttpStatus.OK).header("message","Login Successful").body(users.get().getUsername());
    }

}
