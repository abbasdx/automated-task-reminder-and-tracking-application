package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.OverviewResponseDto;
import com.abbasansari.tasktracker.model.User;
import com.abbasansari.tasktracker.service.ITaskService;
import com.abbasansari.tasktracker.service.ReportService;
import com.abbasansari.tasktracker.util.AuthUtil;
import com.abbasansari.tasktracker.util.CsvUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ITaskService taskService;
    private final ReportService reportService;
    private final AuthUtil authUtil;

    public ReportController(ITaskService taskService, ReportService reportService, AuthUtil authUtil) {
        this.taskService = taskService;
        this.reportService = reportService;
        this.authUtil = authUtil;
    }

    @GetMapping("/overview")
    public ResponseEntity<OverviewResponseDto> overview() {
        User user = authUtil.getCurrentUser();
        return ResponseEntity.ok(reportService.overview(user));
    }

    @GetMapping("/export")
    public void export(HttpServletResponse response) throws Exception {
        User user = authUtil.getCurrentUser();
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=tasks.csv");
        CsvUtil.writeTasks(response.getWriter(), taskService.getAllTasks(user));
    }
}
