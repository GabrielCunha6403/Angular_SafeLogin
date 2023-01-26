import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFormControlInvalid(atribute: string): boolean {
    return !!(
      this.formLogin.get(atribute)?.invalid &&
      this.formLogin.get(atribute)?.touched
    );
  }

  submitForm() {
    const { username, password } = this.formLogin.value;
    this.formLogin.reset;

    this.loginService.login(username, password).subscribe(
      (res) => {
        alert('Login efetuado com sucesso');
        this.router.navigate(['']);
      },
      (err) => {
        alert(err);
      }
    );
  }
}
