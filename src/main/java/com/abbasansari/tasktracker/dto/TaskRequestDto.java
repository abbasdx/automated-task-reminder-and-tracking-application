package com.abbasansari.tasktracker.dto;

import com.abbasansari.tasktracker.model.Category;
import com.abbasansari.tasktracker.model.Priority;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequestDto {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;
    private String description;

    @Future(message = "Due date must be in the future")
    private LocalDateTime dueDate;
    private Priority priority;
    private Category category;

}

