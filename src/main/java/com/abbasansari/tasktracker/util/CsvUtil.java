package com.abbasansari.tasktracker.util;

import com.abbasansari.tasktracker.model.Task;
import java.io.PrintWriter;
import java.util.List;

public class CsvUtil {

    public static void writeTasks(PrintWriter writer, List<Task> tasks) {
        writer.println("ID,Title,Description,Completed,Priority,Category");
        for (Task task : tasks) {
            writer.println(
                    task.getId() + "," +
                            task.getTitle().replace(",", " ") + "," +
                            task.getDescription().replace(",", " ") + "," +
                            task.isCompleted()+","+
                            task.getPriority()+","+
                            task.getCategory()
            );
        }
    }
}

