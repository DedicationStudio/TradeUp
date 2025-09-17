import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-age-user',
    imports: [NgClass, FormsModule],
    templateUrl: './age-user.component.html',
    styleUrl: './age-user.component.css',
    standalone: true
})
export class AgeUserComponent {
  @Output() nextEvent = new EventEmitter<string>();
  avaiable: boolean = false;
  age: string =  "";

  onAgeInput() {
    console.log(this.age)
    if(this.age != ""  && !isNaN(Number(this.age))){
      this.avaiable=true;
    }else{
      this.avaiable=false;
    }
  }

  next(){
    if(this.avaiable){
      this.nextEvent.emit(this.age)
    }
  }
}
