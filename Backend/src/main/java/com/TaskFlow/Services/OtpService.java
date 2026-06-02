package com.TaskFlow.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
    @Autowired
    private JavaMailSender javaMailSender;

    private final Map<String, String> otpRecord =  new HashMap<>();
    public String createOtp(String vid) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpRecord.put(vid, otp);
        return otp;
    }
    public String[] createOtp(){
        String vid = String.valueOf(new Random().nextInt(900000) + 100000);
        while(true){
            if(otpRecord.containsKey(vid)){
                vid = String.valueOf(new Random().nextInt(900000) + 100000);
            }
            else{
                break;
            }
        }
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpRecord.put(vid, otp);
        return new String[]{otp,vid};
    }
    public void sendOtp(String email, String otp) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Your OTP has been sent");
        mailMessage.setText("OTP is: " + otp);
        javaMailSender.send(mailMessage);
    }
    public boolean verifyOtp(String vid,String otp) {
        if(otpRecord.containsKey(vid)) {
            if (otpRecord.get(vid).equals(otp)) {
                otpRecord.remove(vid);
                return true;
            } else {
                return false;
            }
        }
        else return false;
    }
}
