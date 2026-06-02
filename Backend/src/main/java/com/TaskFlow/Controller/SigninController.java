package com.TaskFlow.Controller;


import com.TaskFlow.Entity.Otp;
import com.TaskFlow.Entity.Users;
import com.TaskFlow.Services.OtpService;
import com.TaskFlow.Services.SigninService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/signup")
public class SigninController {

    @Autowired
    private SigninService signinService;
    @Autowired
    private OtpService otpService;

    @PostMapping
    @SessionScope
    public ResponseEntity<String> send(@RequestBody Users user) {
        return signinService.send(user);
    }
    @PostMapping("/otp")
    @SessionScope
    public ResponseEntity<String> otp(@RequestBody Otp otp) {
        if(otpService.verifyOtp(otp.getVid(),otp.getOtp()))return signinService.createUser(otp.getVid());
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");


    }

}
