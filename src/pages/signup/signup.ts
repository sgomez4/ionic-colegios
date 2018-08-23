import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import {Api} from '../../providers/api/api';
import { Usuario } from '../../shared/user';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account:Usuario = {
  
    username: "",
    password: "",
    primernombre: "",
    segundonombre:  "",
    correo:"",
    usuario:""
    
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, 
    public loginService:LoginServiceProvider)
   
    {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    this.loginService.register(this.account).subscribe(
      (registro) => {

        let datoUsuario = {
          username: this.account.username,
          password: this.account.password
        }
        this.loginService.login(datoUsuario);
      },
      (err) => { }
    )

  }

}