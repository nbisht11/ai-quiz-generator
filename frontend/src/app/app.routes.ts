import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';


export const routes: Routes = [
    {
        path: 'signin',
        loadChildren: () =>
            import('./flows/auth/auth.routes').then((m) => m.AUTH_ROUTES)
    },
    {
        path: 'quiz',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./flows/quiz/quiz.routes').then((m) => m.QUIZ_ROUTES)
    },
    {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'signin'
    }
];
