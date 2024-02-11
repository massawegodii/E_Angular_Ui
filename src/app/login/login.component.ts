import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private userservice: UserService,
    private userAuthService: UserAuthService,
    private router: Router
   ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userservice.login(loginForm.value).subscribe(
      (Response: any) => {
        this.userAuthService.setRoles(Response.user.role);
        this.userAuthService.setToken(Response.jwtToken);

        const role = Response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser() {
    this.router.navigate(["/register"]);
  }
}
