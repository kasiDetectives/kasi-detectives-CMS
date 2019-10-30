import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name; email; password; confirmPassword; 
  registrationForm
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  pageURL
  passwordType
  passwordIcon
  constructor(public userService : UsersService,
    public formBuilder: FormBuilder,
    public route: Router,
    // public alertController: AlertController,
    // public toastController: ToastController,
    // public  navigationService : NavigationService,
    // public events: Events
    ) {
      this.registrationForm = formBuilder.group({
        name: [this.name, [Validators.compose(
          [Validators.required, Validators.pattern(this.namePattern)]
        )]],
        email: [this.email, [Validators.compose(
          [Validators.required, Validators.pattern(this.emailPattern)]
        )]],
        password: [this.password,Validators.compose(
          [Validators.required, Validators.pattern(this.passwordPattern)]
        )],
        confirmPassword: [this.confirmPassword, Validators.required]
      })
  }

  addUser(){
    this.email = this.registrationForm.get('email').value
    this.name = this.registrationForm.get('name').value
    this.password = this.registrationForm.get('password').value
    this.confirmPassword = this.registrationForm.get('confirmPassword').value

    console.log(this.email);
    console.log(this.name);
    console.log(this.password);
    console.log(this.confirmPassword);
    
    if(this.password === this.confirmPassword){
      return this.userService.register(this.email, this.password, this.name).then((data)=>{
      console.log(data)
          if(data.operationType === "signIn"){
            console.log("signed in")
            let userId = data.user.uid
            console.log("Current user : " + userId)
            this.route.navigate([''])
          }else{
           
          }
        }).catch((error) => {
          console.log(error)
        })
      
    }else if(this.password !== this.confirmPassword){
     
    }
  }

  ngOnInit() {
  }

}
