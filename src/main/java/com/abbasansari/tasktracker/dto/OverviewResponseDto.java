package com.abbasansari.tasktracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OverviewResponseDto {
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
}
