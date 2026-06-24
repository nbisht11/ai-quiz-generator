import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthCheckService } from '../../services/health-check.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, 
    private healthCheckService: HealthCheckService
  ){}
  
  ngOnInit(): void {
    this.healthCheckService.polledData$.subscribe({
      next: (data:string) => {
        console.log(data);
      },
    })
  }

  redirectToHome(){
    this.router.navigate(['/quiz']);
  }

}
