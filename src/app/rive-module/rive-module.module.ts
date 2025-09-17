import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiveModule, RIVE_FOLDER } from 'ng-rive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RiveModule,
  ],
  exports: [
    RiveModule
  ]
})
export class RiveModuleModule { }
