package com.abbasansari.tasktracker.scheduler;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class ReminderExecutor {

    private static final ScheduledExecutorService EXECUTOR =
            Executors.newScheduledThreadPool(2);

    private ReminderExecutor() {}

    public static ScheduledExecutorService getExecutor() {
        return EXECUTOR;
    }
}
