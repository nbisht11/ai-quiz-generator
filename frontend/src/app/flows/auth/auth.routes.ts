import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./signin/signin.component').then((c) => c.SigninComponent)
    }
];