import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit() {

    this.isAuthenticated = this.authService.isAuthenticated();
    const userDetails = this.authService.getUserDetails();
    
    if (userDetails && this.isAuthenticated) {
      this.firstName = userDetails.firstName;
      this.lastName = userDetails.lastName;
    }
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
