import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  myForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.myForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login() {

    let variable = this.myForm.getRawValue();

    this._authService.login(variable).subscribe({
      next: (data: any) => {
        console.log(data);

        //token ==> era el valor que nos retorna en el proceso del login
        sessionStorage.setItem("token",data.token);
        alert("LOGIN CORRECTO");
        this._router.navigate(["template"]);
        //nos tiene que redirigir al template
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => { }
    });


  }

}
