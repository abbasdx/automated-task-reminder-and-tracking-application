package com.abbasansari.tasktracker.service;

import com.abbasansari.tasktracker.dto.TaskRequestDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiTaskService {

    private final WebClient webClient = WebClient.builder().build();;

    private final ObjectMapper objectMapper =
            new ObjectMapper().findAndRegisterModules();

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;


    public TaskRequestDto generateTask(String text) {

        String prompt = createPrompt(text);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", prompt)
                                )
                        )
                )
        );

        String response = webClient.post()
                .uri(apiUrl + "?key=" + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            JsonNode root = objectMapper.readTree(response);

            String aiJson = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            aiJson = cleanJson(aiJson);

            return objectMapper.readValue(
                    aiJson,
                    TaskRequestDto.class
            );

        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to process Gemini response",
                    e
            );
        }
    }

    private String createPrompt(String text) {

        LocalDateTime now = LocalDateTime.now();

        String today = now.toLocalDate().toString();
        String currentTime = now.toLocalTime()
                .withSecond(0)
                .withNano(0)
                .toString();

        return """
    Today is %s.
    Current time is %s.

    Convert the user sentence into ONE valid JSON object for a task.

    IMPORTANT:
    - Return ONLY raw JSON
    - No markdown
    - No explanation
    - No extra text

    Required fields:
    title
    description
    dueDate
    priority
    category

    Allowed values:
    priority = LOW, MEDIUM, HIGH
    category = WORK, STUDY, PERSONAL, OTHER

    TITLE RULES:
    - Make short clean title
    - If user input already contains a clear task, use it directly as title
    - Preserve action verbs like Buy, Finish, Call, Study, Submit, Go
    - Never use "New Task"
    - If input is vague, generate a meaningful title
    - Remove useless words:
      I have to, I need to, please, want to

    DESCRIPTION RULES:
    - Add short useful description only if needed
    - If unnecessary use null
    - Never repeat title

    DATE RULES:
    - today = %s
    - tomorrow = next day
    - if no date = today

    TIME RULES:
    - If exact time given, use it

    Natural language time mapping:
    - morning = 09:00:00
    - noon = 12:00:00
    - afternoon = 15:00:00
    - evening = 18:00:00
    - night = 21:00:00

    Important:
    - "today evening" means %sT18:00:00
    - "today afternoon" means %sT15:00:00
    - "today night" means %sT21:00:00

    SMART TIME RULE:
    - If user says urgent / asap / immediately and no exact time:
      schedule within next 60 minutes today
    - If user says "today" with no exact time:
      use 2 to 4 hours after current time
    - Choose nearest reasonable future time
    - If current time + selected time crosses midnight:
      use tomorrow at 09:00:00

    If no time given:
    - use 2 to 4 hours after current time

    dueDate format:
    yyyy-MM-dd'T'HH:mm:ss

    PRIORITY RULES:
    - urgent / high / important / asap / immediately = HIGH
    - low / later = LOW
    - otherwise = MEDIUM

    CATEGORY RULES:
    - WORK = meeting, office, project, report, coding, backend, client
    - STUDY = exam, assignment, homework, study, class, revision
    - PERSONAL = gym, groceries, doctor, family, shopping, health
    - OTHER = unclear

    EXAMPLES:

    Input:
    buy groceries

    Output:
    {
      "title":"Buy groceries",
      "description":null,
      "dueDate":"%sT18:00:00",
      "priority":"MEDIUM",
      "category":"PERSONAL"
    }

    Input:
    submit report urgent

    Output:
    {
      "title":"Submit report",
      "description":null,
      "dueDate":"%sT14:30:00",
      "priority":"HIGH",
      "category":"WORK"
    }

    Input:
    go gym today evening

    Output:
    {
      "title":"Go gym",
      "description":null,
      "dueDate":"%sT18:00:00",
      "priority":"MEDIUM",
      "category":"PERSONAL"
    }

    User Sentence:
    %s
    """.formatted(
                today,
                currentTime,
                today,
                today,
                today,
                today,
                today,
                today,
                today,
                text
        );
    }

    private String cleanJson(String json) {
        return json
                .replace("```json", "")
                .replace("```", "")
                .trim();
    }
}