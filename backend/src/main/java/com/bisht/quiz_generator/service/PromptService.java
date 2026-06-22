package com.bisht.quiz_generator.service;

import com.bisht.quiz_generator.dto.GenerateQuizRequest;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class PromptService {

    // Load the YAML/Text file directly from resources
    @Value("${app.config.prompt-path}")
    private Resource promptResource;

    public String buildPrompt(GenerateQuizRequest request) {
        Map<String, Object> model = Map.of(
                "content", request.getContent(),
                "number_of_questions", Integer.toString(request.getNumberOfQuestions()),
                "question_type", request.getTypeOfQuestion()
        );
        PromptTemplate template = new PromptTemplate(promptResource);
        return template.render(model);
    }
}