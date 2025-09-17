import { Component, Input, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LearnComponent } from '../learn/learn.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LevelsService } from '../levels.service';

@Component({
    selector: 'app-home',
    imports: [ToolbarComponent, LearnComponent, SidebarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true
})
export class HomeComponent implements OnInit{
    @Input({required: true}) idUser: string = "1";

    constructor(private levelService: LevelsService){}

    ngOnInit(): void {

    }

}
