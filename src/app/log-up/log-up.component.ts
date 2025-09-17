import { Component } from '@angular/core';
import { SubscriptionComponent } from "../subscription/subscription.component";
import { AgeUserComponent } from "../age-user/age-user.component";
import { LevelsService } from '../levels.service';
import { CategoryComponent } from '../category/category.component';
import { NgClass } from '@angular/common';
import { user } from '@angular/fire/auth';
import { AnalyticsFromComponent } from '../analytics-from/analytics-from.component';
import { AnalyticsHowComponent } from '../analytics-how/analytics-how.component';
import { AnalyticsExperienceComponent } from '../analytics-experience/analytics-experience.component';
import { AnalyticsAchiveComponent } from '../analytics-achive/analytics-achive.component';
import { AnalyticsGoalComponent } from '../analytics-goal/analytics-goal.component';
import { Router, RouterLink } from '@angular/router';
@Component({
    selector: 'app-log-up',
    imports: [SubscriptionComponent, AgeUserComponent, CategoryComponent, NgClass, AnalyticsFromComponent, AnalyticsHowComponent, AnalyticsExperienceComponent, AnalyticsAchiveComponent, AnalyticsGoalComponent, RouterLink],
    templateUrl: './log-up.component.html',
    styleUrl: './log-up.component.css',
    standalone: true
})
export class LogUpComponent {
  age:string="";
  username:string | null="";
  email: string | null="";
  password: string | null="";
  progress: number = 0;
  click: boolean = false
  userAnalytics: any[] = []
  phase=0;
  idUser:string = "";

  constructor(private levelsService: LevelsService, private router: Router){}

  ageData(value: string) {
    this.age=value;
  }

  userData(value: (string | null)[]){
    this.email=value[0];
    this.password=value[1];
    this.username= value[2];

  }

  category(data: string){
    //this.userAnalytics[0] = data;
    this.userAnalytics[0] = "Crypto";
  }

  from(data: string){
    this.userAnalytics[1]= data
  }

  how(data: string){
    this.userAnalytics[2]= data;
  }

  experience(data: string){
    this.userAnalytics[3]= data;
  }

  goal(data: string){
    this.userAnalytics[4]=data;
  }

  creationAccount(){
    this.levelsService.createAccount(this.email,  this.age, this.userAnalytics, this.password, this.username, "").subscribe((data:any)=>{
      console.log(data)
      this.idUser=data.id_user;
      console.log(this.idUser)
      this.router.navigate(['/learn/', this.idUser]);
    });
  }

    holding(){
    this.click=true;
    if(this.userAnalytics[this.phase] !== undefined || this.phase == 4){
      this.phase++;
      this.progress+=20;
    }

  }

  notHolding(){
    this.click=false;
  }
}
