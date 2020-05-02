import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
    console.log('Hello LoginService');
  }
  login(user: string, password: string): boolean {
    return true;
  }
}
