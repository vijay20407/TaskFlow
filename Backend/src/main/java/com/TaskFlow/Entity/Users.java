package com.TaskFlow.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.ConnectionBuilder;
import java.sql.SQLType;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "Users Data")
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String,String> courseMap = new HashMap<>();
    public void setCourseMap(Map<String,String> courseMap) {
        this.courseMap = courseMap;
    }
    public Map<String,String> getCourseMap() {
        return courseMap;
    }
    public void addCourse(String courseName,String courseDetails){
        if(courseMap == null){
            courseMap = new HashMap<>();
        }
        courseMap.put(courseName,courseDetails);
    }
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String,List<String>> timetable;

    public Map<String, List<String>> getTimetable() {
        return timetable;
    }

    public void setTimetable(Map<String, List<String>> timetable) {
        this.timetable = timetable;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

}
