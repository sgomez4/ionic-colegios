import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import {Api} from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, email: string, password: string,nombre:string,apellido:string } = {
    username: '',
    email: '',
    password: '',
    nombre:"",
    apellido:""
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, 
    public ApiService: Api )
   
    {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    this.ApiService.post('users/signup',this.account).subscribe(
      (registro) => {

        let datoUsuario = {
          username: this.account.username,
          password: this.account.password
        }
        this.ApiService.post('users/login',datoUsuario).subscribe(

          (usuario) => {
            console.log(usuario);
          },

          (error) => { })
      },
      (err) => { }
    )

  }
}
