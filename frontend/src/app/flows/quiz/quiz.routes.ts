import { Routes } from '@angular/router';
import { AssessmentService } from './services/assessment.service';

export const QUIZ_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./quiz-builder/quiz-builder.component').then((c) => c.QuizBuilderComponent),
        providers: [
            AssessmentService
        ]
    }
];