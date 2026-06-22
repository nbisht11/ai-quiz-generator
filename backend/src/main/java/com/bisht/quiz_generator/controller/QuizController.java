package com.bisht.quiz_generator.controller;

import com.bisht.quiz_generator.dto.GenerateQuizRequest;
import com.bisht.quiz_generator.dto.GenerateQuizResponse;
import com.bisht.quiz_generator.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuizController {

    @Autowired
    QuizService quizService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/generate-quiz")
    public GenerateQuizResponse generateQuiz(@RequestBody GenerateQuizRequest request){
        return this.quizService.generateQuiz(request);
    }
}