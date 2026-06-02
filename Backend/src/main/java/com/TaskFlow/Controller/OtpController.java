package com.TaskFlow.Controller;

import com.TaskFlow.Entity.Otp;
import com.TaskFlow.Services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/otp")
public class OtpController {
    @Autowired
    private OtpService otpService;

    @PostMapping("/verify")
    @SessionScope
    public ResponseEntity<Boolean> verifyOtp(@RequestBody Otp otp){
        if(otpService.verifyOtp(otp.getVid(),otp.getOtp())){
            return ResponseEntity.ok(true);
        }
        else return ResponseEntity.ok(false);
    }
    @PostMapping("/send")
    @SessionScope
    public ResponseEntity<String> sendOtp(@RequestBody String email){
        String[] values = otpService.createOtp();
        otpService.sendOtp(email,values[0]);
        return ResponseEntity.ok(values[1]);

    }
}
