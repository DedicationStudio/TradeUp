import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { from } from 'rxjs';
import { routes } from '../app.routes';
import { LevelsService } from '../levels.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-log-in',
    imports: [NgClass, FormsModule, RouterLink],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css',
    standalone: true
})
export class LogInComponent {
  avaiable: boolean = false;
  email: string =  "";
  password: string =  "";
  view: string = "visibility_off";
  showPassword:boolean = false;
  errorAccount: string = "";
  errorPassword: string = "";


  constructor(private router: Router, private levelsService: LevelsService){}

  private auth: Auth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();
  user = user(this.auth);

   async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider, browserPopupRedirectResolver);
      const user = result.user; // L'oggetto user contiene le informazioni dell'utente autenticato

      console.log('Login riuscito!', user);
      this.router.navigate(['/learn']);
    } catch (error: any) {
      console.error('Errore durante il login con Google:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Pop-up di login chiuso dall\'utente.');
      }
    }
  }

  onSubscription() {
    console.log(this.email, this.password)
    if(this.email != "" && this.password != "" ){
      this.avaiable=true;
    }else{
      this.avaiable=false;
    }
  }

  viewing(){
    if(this.view=="visibility"){
      this.view="visibility_off"
      this.showPassword = false;
    }else{
      this.view="visibility"
      this.showPassword = true;
    }
  }

  next(){
    if(this.avaiable){
      //  this.nextEvent.emit([this.email, this.password, this.name])
      this.levelsService.loginAccount(this.email, this.password).subscribe({
        next: (data: any) => {
          console.log("data: ", data);
          this.router.navigate(['/learn/', data.user.id_user]);
        },
        error: (err) => {
          this.errorAccount = "";
          this.errorPassword = "";
          console.log("errore: ", err);
          // Qui puoi prendere il messaggio che arriva dal backend
          const errorMsg = err.error?.message || "Errore sconosciuto";
          console.log("Messaggio backend:", errorMsg);

          // se vuoi usarlo come variabile in HTML
          if(errorMsg == "Account non trovato"){
            this.errorAccount = errorMsg;
          }
          if(errorMsg == "Password errata"){
            this.errorPassword=errorMsg
          }else{
            this.errorAccount = errorMsg;
          }
        }
      });
    }
  }
}
