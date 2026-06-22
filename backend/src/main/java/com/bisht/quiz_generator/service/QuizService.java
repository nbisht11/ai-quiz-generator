package com.bisht.quiz_generator.service;
import com.bisht.quiz_generator.dto.GenerateQuizRequest;
import com.bisht.quiz_generator.dto.GenerateQuizResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    PromptService promptService;

    private final ChatClient chatClient;

    public QuizService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public GenerateQuizResponse generateQuiz(GenerateQuizRequest request) {

        String finalPrompt = promptService.buildPrompt(request);

        return chatClient.prompt()
                .user(finalPrompt)
                .call()
                .entity(GenerateQuizResponse.class);
    }
}
