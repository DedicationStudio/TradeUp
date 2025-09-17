import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';

@Component({
    selector: 'app-subscription',
    imports: [NgClass, FormsModule],
    templateUrl: './subscription.component.html',
    styleUrl: './subscription.component.css',
    standalone: true
})
export class SubscriptionComponent{
  @Output() nextEvent = new EventEmitter<(string | null)[]>();
  avaiable: boolean = false;
  name: string =  "";
  email: string =  "";
  password: string =  "";
  view: string = "visibility_off";
  showPassword:boolean = false;

  private auth: Auth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();
  user = user(this.auth);

   async loginWithGoogle() {
  try {
    const result = await signInWithPopup(
      this.auth,
      this.googleProvider,
      browserPopupRedirectResolver
    );

    const user = result.user;
    console.log('Login riuscito!', user);
    this.nextEvent.emit([user.email, "", user.displayName]);
  } catch (error: any) {
    console.error('Errore durante il login con Google:', error);
  }
  }

  onSubscription() {
    console.log(this.name, this.email, this.password)
    if(this.name != "" && this.email != "" && this.password != "" ){
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
      this.nextEvent.emit([this.email, this.password, this.name])
    }
  }
}
