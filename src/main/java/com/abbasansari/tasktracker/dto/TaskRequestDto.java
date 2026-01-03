package com.abbasansari.tasktracker.dto;

import com.abbasansari.tasktracker.model.Category;
import com.abbasansari.tasktracker.model.Priority;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequestDto {

    private String title;
    private String description;
    private LocalDateTime dueDate;
    private Priority priority;
    private Category category;

}

