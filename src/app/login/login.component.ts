import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string
  password: string
  emailPattern : string = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  loginForm
  constructor(public userService: UsersService,
   // public alertController: AlertController,
    public route: Router,
    public formBuilder: FormBuilder,
    //public events : Events,
    ) {
      this.loginForm = formBuilder.group({
    
        email: [this.email, Validators.compose(
          [Validators.required, Validators.pattern(this.emailPattern)]
        )],
        password: [this.password, Validators.compose(
          [Validators.required, Validators.pattern(this.passwordPattern)]
        )]
      })
  }
  login(){
    this.email = this.loginForm.get('email').value
    this.password = this.loginForm.get('password').value
    console.log(this.email, this.password)
    this.userService.login(this.email, this.password).then((result) =>{
      if(result.operationType === "signIn"){
        console.log("Welcome " + result.user.email)
        let link = "home"
        this.route.navigate([''])
        console.log('why are you running again?');
      }else{
      }
    })
  }

  ngOnInit() {
  }

}
