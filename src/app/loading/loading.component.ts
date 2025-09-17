import { Component } from '@angular/core';
import { RiveCanvas, RiveLinearAnimation, RiveModule, RiveStateMachine } from 'ng-rive';

@Component({
    selector: 'app-loading',
    imports: [RiveCanvas, RiveStateMachine, RiveModule],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.css',
    standalone: true
})
export class LoadingComponent {

}
