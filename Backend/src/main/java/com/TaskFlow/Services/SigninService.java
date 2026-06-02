package com.TaskFlow.Services;

import com.TaskFlow.Entity.Users;
import com.TaskFlow.Repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class SigninService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OtpService otpService;

    private void setDetaills(String vid,String username, String password, String email){
        List<String> list = new ArrayList<>();
        list.add(username);
        list.add(password);
        list.add(email);
        tempInfo.put(vid,list);
    }
    private final Map<String,List<String>> tempInfo =  new HashMap<>();
    public ResponseEntity<String> send(@RequestBody Users user) {
        Optional<Users> optionalUser = userRepository.findByUsername(user.getUsername());
        Optional<Users> optionalUser2 = userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent()||optionalUser2.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username/Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String vid = "";
        while(true){
            vid = String.valueOf(new Random().nextInt(900000) + 100000);
           if(tempInfo.containsKey(vid)){}
           else{
               setDetaills(vid,user.getUsername(),user.getPassword(),user.getEmail());
               break;
           }
        }
        otpService.sendOtp(user.getEmail(), otpService.createOtp(vid));
        return ResponseEntity.status(HttpStatus.OK).body(vid);
    }
    public ResponseEntity<String> createUser(String vid) {
        List<String> list = tempInfo.get(vid);
        Users user = new Users();
        user.setUsername(list.get(0));
        user.setPassword(list.get(1));
        user.setEmail(list.get(2));

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(user.getUsername());

    }
}
