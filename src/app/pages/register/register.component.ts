import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';

  
 constructor(private authService : AuthService, private router : Router )
 {

 }
  

 register() {
  this.authService.register(this.email, this.password, this.firstname, this.lastname).subscribe({
    next: (response) => {
      alert(response.message);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      alert(err.error.message);
      console.error(err);
    }
  });
}


}
