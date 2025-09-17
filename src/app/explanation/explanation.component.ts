import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-explanation',
    imports: [],
    templateUrl: './explanation.component.html',
    styleUrl: './explanation.component.css',
    standalone: true
})
export class ExplanationComponent {
  @Input() text!: string;
}
