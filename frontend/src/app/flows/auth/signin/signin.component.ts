import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AUTH_TOKEN } from '../../../core/constants/app.constant';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  passcode:string = "";
  error:string="";

  constructor(private authService: AuthService, private router: Router) {}

  signIn(){
    this.authService.signInWithPasscode(this.passcode).subscribe((data:any) => {
      sessionStorage.setItem(AUTH_TOKEN,data.token);
      this.router.navigateByUrl("/quiz");
    }, (_error)=>{
      this.error = "Incorrect passcode!!";
      this.passcode = "";
    })
  }
}
