import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomEditorComponent } from '../components/custom-editor/custom-editor.component';
import { PopupComponent } from '../../../shared/components/popup/popup.component';
import { QuizModalComponent } from '../components/quiz-modal/quiz-modal.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { Question } from '../models/question.interface';
import { AssessmentService } from '../services/assessment.service';

interface QuizBuilderState {
  showQuiz: boolean;
  questions: Question[];
  showQuestions: boolean;
  showResult: boolean;
  checkedAnswer: boolean;
  showReason: boolean;
  showLoader: boolean;
  loadingSpinnerMessage: string;
  errorMessage: string;
  showPopup: boolean;
  popupMessage: string;
  showTryAgainButton: boolean;
  assessmentData: any;
  showAssessment: boolean;
  selectedTopic: string;
}


@Component({
  selector: 'app-quiz-builder',
  imports: [ReactiveFormsModule, CommonModule, CustomEditorComponent, PopupComponent, FormsModule, QuizModalComponent, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './quiz-builder.component.html',
  styleUrl: './quiz-builder.component.scss'
})
export class QuizBuilderComponent {
  private state: QuizBuilderState = {
    showQuiz: false,
    questions: [],
    showQuestions: false,
    showResult: false,
    checkedAnswer: false,
    showReason: false,
    showLoader: false,
    loadingSpinnerMessage: "",
    errorMessage: "",
    showPopup: false,
    popupMessage: '',
    showTryAgainButton: false,
    assessmentData: null,
    showAssessment: false,
    selectedTopic: ''
  };

  get showQuiz() { return this.state.showQuiz; }
  get questions() { return this.state.questions; }
  get showQuestions() { return this.state.showQuestions; }
  get showResult() { return this.state.showResult; }
  get checkedAnswer() { return this.state.checkedAnswer; }
  get showReason() { return this.state.showReason; }
  get showLoader() { return this.state.showLoader; }
  get loadingSpinnerMessage() { return this.state.loadingSpinnerMessage; }
  get errorMessage() { return this.state.errorMessage; }
  get showPopup() { return this.state.showPopup; }
  get popupMessage() { return this.state.popupMessage; }
  get showTryAgainButton() { return this.state.showTryAgainButton; }
  get assessmentData() { return this.state.assessmentData; }
  get showAssessment() { return this.state.showAssessment; }
  get selectedTopic() { return this.state.selectedTopic; }

  constructor(
    private assessmentService: AssessmentService
  ) { }

  private patchState(partialState: Partial<QuizBuilderState>) {
    this.state = { ...this.state, ...partialState };
  }

  getQuestions(data: string) {
    this.patchState({ errorMessage: "",
      showLoader: true,
      loadingSpinnerMessage: "Generating questions..." });
    
    this.assessmentService.submitDataAndGetQuestions(data).subscribe({
      next: (questions: Question[]) => {
        this.patchState({
          showQuiz: true,
          questions: questions,
          showLoader: false,
          loadingSpinnerMessage: ""
        });
      },
      error: (_error: any) => {
        this.patchState({
          errorMessage: "Something went wrong. Please try again.",
          showLoader: false,
          loadingSpinnerMessage: ""
        });
      }
    });
  }

  closeQuizPopup(closeQuiz?: boolean) {
    this.patchState({
      showQuiz: false,
      showQuestions: false,
      showResult: false,
      checkedAnswer: false,
      showReason: false
    });
  }

  closeErrorMessagePopup() {
    this.patchState({ errorMessage: '' });
  }

  closePopup() {
    this.patchState({ showPopup: false });
  }

  showLoadingSpinner(message: string) {
    this.patchState({
      showLoader: true,
      loadingSpinnerMessage: message
    });
  }

  hideLoadingSpinner() {
    this.patchState({
      showLoader: false,
      loadingSpinnerMessage: ""
    });
  }
}
