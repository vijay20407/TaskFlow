package com.TaskFlow.DTO;

import java.util.Map;

public class EditCourseMap {
    private String username;
    private Map<String, String> newCourseMap;

    public String getUserName() {
        return username;
    }

    public Map<String, String> getNewCourseMap() {
        return newCourseMap;
    }
    public void setNewCourseMap(Map<String, String> newCourseMap) {
        this.newCourseMap = newCourseMap;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
