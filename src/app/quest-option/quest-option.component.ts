import { NgClass } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-quest-option',
    imports: [NgClass],
    templateUrl: './quest-option.component.html',
    styleUrl: './quest-option.component.css',
    standalone: true
})
export class QuestOptionComponent implements OnChanges{
@Input({ required: true }) text!: string;
@Input({ required: true }) check: boolean = false;
@Input({ required: true }) correct: boolean = false;

click: boolean = false;
icon: string = "radio_button_unchecked";

ngOnChanges(changes: SimpleChanges): void {
  this.updateIcon();
  console.log("click:", this.click, "check:", this.check);
}

updateIcon(): void {
  if (this.check) {
    this.icon = "check_circle";
    this.click = true;
  } else {
    this.icon = "radio_button_unchecked";
    this.click = false;
  }
}

onClick(): void {
  if (!this.check) {
    this.click = !this.click;
    this.icon = this.click ? "radio_button_checked" : "radio_button_unchecked";
  }
}

}
