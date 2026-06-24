import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../models/question.interface';
import { CommonModule } from '@angular/common';


interface QuizState {
  showQuestions: boolean;
  currentQuestion: Question | null;
  checkedAnswer: boolean;
  showReason: boolean;
  finalResult: string;
  showResult: boolean;
  showTryAgainButton: boolean;
  userAnswers: Record<number, any>; 
  currentQuestionIndex: number;
  isSubmitted: boolean;
}


@Component({
  selector: 'app-quiz-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss']
})
export class QuizModalComponent {
  @Input() questions!: Question[];
  @Output() closeQuiz = new EventEmitter();

  assessmentForm!: FormGroup;
  private state: QuizState = {
    showQuestions: false,
    currentQuestion: null,
    checkedAnswer: false,
    showReason: false,
    finalResult: '',
    showResult: false,
    showTryAgainButton: false,
    userAnswers: {},
    currentQuestionIndex: -1,
    isSubmitted: false
  };

  get showQuestions() { return this.state.showQuestions; }
  get currentQuestion() { return this.state.currentQuestion; }
  get checkedAnswer() { return this.state.checkedAnswer; }
  get showReason() { return this.state.showReason; }
  get finalResult() { return this.state.finalResult; }
  get showResult() { return this.state.showResult; }
  get showTryAgainButton() { return this.state.showTryAgainButton; }
  get userAnswers() { return this.state.userAnswers; }
  get currentQuestionIndex() { return this.state.currentQuestionIndex; }
  get isSubmitted() { return this.state.isSubmitted; }

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.buildFormFromData();
  }

  // 4. Helper method to keep state updates clean and grouped together
  private patchState(partialState: Partial<QuizState>) {
    this.state = { ...this.state, ...partialState };
  }

  submitAssessment(): void {
    this.patchState({ isSubmitted: true });
  }

  get currentAnswer() {
    return this.assessmentForm.get('answer')?.value;
  }

  buildFormFromData() {
    this.assessmentForm = this.fb.group({});
    this.assessmentForm.addControl('answer', new FormControl('', [Validators.required]));
    
    this.patchState({
      currentQuestionIndex: 0,
      currentQuestion: this.questions[0],
      showQuestions: true
    });
  }

  prevQuestion() {
    const newIndex = this.state.currentQuestionIndex - 1;
    
    this.patchState({
      currentQuestionIndex: newIndex,
      currentQuestion: this.questions[newIndex],
      checkedAnswer: true,
      showReason: true
    });

    this.assessmentForm.get('answer')?.setValue(this.state.userAnswers[newIndex]);
    this.assessmentForm.get('answer')?.disable();
  }

  nextQuestion() {
    const { currentQuestionIndex, checkedAnswer, userAnswers } = this.state;
    
    // Track the newly entered answer
    const updatedAnswers = { 
      ...userAnswers, 
      [currentQuestionIndex]: this.assessmentForm.get('answer')?.value 
    };
    
    this.patchState({ userAnswers: updatedAnswers });

    if (!checkedAnswer) {
      this.patchState({ showReason: true, checkedAnswer: true });
      this.assessmentForm.get('answer')?.disable();
      return;
    }

    if (currentQuestionIndex < this.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const hasAnsweredNext = !!updatedAnswers[nextIndex];

      this.patchState({
        currentQuestionIndex: nextIndex,
        currentQuestion: this.questions[nextIndex],
        checkedAnswer: hasAnsweredNext,
        showReason: hasAnsweredNext
      });

      if (hasAnsweredNext) {
        this.assessmentForm.get('answer')?.setValue(updatedAnswers[nextIndex]);
        this.assessmentForm.get('answer')?.disable();
      } else {
        this.assessmentForm.get('answer')?.reset();
        this.assessmentForm.get('answer')?.enable();
      }
    } else {
      this.submitAndShowResult();
    }
  }

  submitAndShowResult() {
    let correct = 0;
    let incorrect = 0;

    this.questions.forEach((q, i) => {
      if (this.state.userAnswers[i] === q.correctAnswer) correct++;
      else incorrect++;
    });

    const total = this.questions.length;
    const percentage = (correct / total) * 100;

    this.patchState({
      finalResult: `
        Quiz Complete!<br>
        ✅ Correct Answers: ${correct}<br>
        ❌ Incorrect Answers: ${incorrect}
      `,
      showResult: true,
      showQuestions: false,
      showTryAgainButton: percentage < 60
    });
  }

  get result() {
    return this.state.finalResult;
  }

  get reason() {
    const answer = this.state.userAnswers[this.state.currentQuestionIndex];
    return this.state.currentQuestion?.options.find(item => item.optionLabel === answer)?.reason || '';
  }

  closeQuizPopup() {
    this.patchState({
      showQuestions: false,
      showResult: false,
      checkedAnswer: false,
      showReason: false
    });
    this.closeQuiz.emit(true);
  }

  tryAgain() {
    this.assessmentForm.reset();
    this.assessmentForm.get('answer')?.enable();
  
    this.patchState({
      userAnswers: {},
      currentQuestionIndex: 0,
      currentQuestion: this.questions[0],
      showResult: false,
      showQuestions: true,
      checkedAnswer: false,
      showReason: false,
      showTryAgainButton: false
    });
  }

  get disablePrevButton() {
    return this.state.currentQuestionIndex <= 0;
  }

  get disableNextButton() {
    return this.assessmentForm.invalid;
  }

  get nextButtonName() {
    if (this.state.checkedAnswer) {
      return this.state.currentQuestionIndex === this.questions.length - 1 ? "Submit" : "Next";
    }
    return "Check Answer";
  }

}
