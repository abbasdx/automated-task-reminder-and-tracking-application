package com.abbasansari.tasktracker.controller;

import com.abbasansari.tasktracker.dto.OverviewResponseDto;
import com.abbasansari.tasktracker.service.ReportService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/overview")
    public OverviewResponseDto overview() {
        return reportService.overview();
    }

}
