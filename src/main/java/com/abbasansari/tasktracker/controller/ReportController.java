package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.OverviewResponseDto;
import com.abbasansari.tasktracker.service.ReportService;
import com.abbasansari.tasktracker.service.TaskService;
import com.abbasansari.tasktracker.util.CsvUtil;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final TaskService taskService;
    private final ReportService reportService;

    public ReportController(TaskService taskService,
                            ReportService reportService) {
        this.taskService = taskService;
        this.reportService = reportService;
    }

    @GetMapping("/overview")
    public OverviewResponseDto overview() {
        return reportService.overview();
    }

    @GetMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        response.setContentType("text/csv");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=tasks.csv"
        );
        CsvUtil.writeTasks(
                response.getWriter(),
                taskService.getAllTasks()
        );
    }
}
