interface Option {
    optionLabel: string;
    optionValue: string;
    reason: string;
}
export interface Question {
    question: string;
    options: Option[];
    correctAnswer: 'a' | 'b' | 'c' | 'd';
}