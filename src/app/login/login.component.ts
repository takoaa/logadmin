import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      // Explicitly type parameters
      this.service.login(this.loginForm.value).subscribe(
        (response: { jwt: string }) => {
          if (response.jwt) {
            // alert(`Hello, your token is ${response.jwt}`);
            localStorage.setItem('jwt', response.jwt);
            this.router.navigateByUrl('/dashboard');
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}