package com.bisht.quiz_generator.dto;

public class GenerateQuizResponse {

    private QuizQuestionsAndAnswers[] questions;

    public QuizQuestionsAndAnswers[] getQuestions() {
        return questions;
    }

    public void setQuestions(QuizQuestionsAndAnswers[] questions) {
        this.questions = questions;
    }

    public static class QuizQuestionsAndAnswers {
        private String question;
        private Option[] options;
        private char correctAnswer;

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public Option[] getOptions() {
            return options;
        }

        public void setOptions(Option[] options) {
            this.options = options;
        }

        public char getCorrectAnswer() {
            return correctAnswer;
        }

        public void setCorrectAnswer(char correctAnswer) {
            this.correctAnswer = correctAnswer;
        }
    }

    public static class Option {
        private String optionValue;
        private String optionLabel;
        private String reason;

        public String getOptionValue() {
            return optionValue;
        }

        public void setOptionValue(String optionValue) {
            this.optionValue = optionValue;
        }

        public String getOptionLabel() {
            return optionLabel;
        }

        public void setOptionLabel(String optionLabel) {
            this.optionLabel = optionLabel;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }
    }
}