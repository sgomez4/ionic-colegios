copiar en el archivo autogenerado login-service.ts lo siguiente
```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

@Injectable()
export class LoginServiceProvider {

  tokenKey: string = 'JWT';
  isAuthenticated: boolean = false;
  username: string;
  authToken: string = undefined;
  constructor(public http: HttpClient) {
    console.log('Hello LoginServiceProvider Provider');
    this.loadUserCredentials();
  }

  private loadUserCredentials() {
    let credentials = JSON.parse(localStorage.getItem('TOKEN') || '{}');
    /* this.storage.get(environment.TOKEN_KEY).then(credentials => {
      
    }); */
    if (credentials) {
      if (credentials.usuario != undefined) {
        this.isAuthenticated = true;
        //this.useCredentials(credentials);

      }
    } else
      console.log('Revisar!! no guarda usuario')
  }
  private storeUserCredentials(credentials) {
    localStorage.setItem('TOKEN', JSON.stringify(credentials));
    this.useCredentials(credentials);
  }
  private useCredentials(credentials) {
    this.isAuthenticated = true;
    this.username = credentials.usuario;
  }
  private destroyUserCredentials() {
    this.username = '';
    this.isAuthenticated = false;
    this.authToken = undefined;
    localStorage.removeItem('TOKEN');
  }
  logout() {

    this.destroyUserCredentials();
  }

  IsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
  //aun no se guarda el username.
  getUsername() {
    return this.username;
  };
  logOutFunction() {
    this.destroyUserCredentials();
  };
}

```