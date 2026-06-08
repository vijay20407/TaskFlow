package com.TaskFlow.DTO;


public class Course {
    private String username;
    private String courseName;
    private String courseDetails;
    public String getCourseName() {
        return courseName;
    }
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    public String getCourseDetails() {
        return courseDetails;

    }
    public void setCourseDetails(String courseDetails) {
        this.courseDetails = courseDetails;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
