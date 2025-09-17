import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LevelsService } from '../levels.service';
import { NgClass } from '@angular/common';


@Component({
    selector: 'app-category',
    imports: [NgClass],
    templateUrl: './category.component.html',
    styleUrl: './category.component.css',
    standalone: true
})
export class CategoryComponent implements OnInit{
  @Output() nameCategory = new EventEmitter<string>();

  progress: number=0;
  categorys: any = [];
  selected: number = -1

  constructor(private levelsService: LevelsService){}

  ngOnInit(): void {
    this.levelsService.getCategory().subscribe((data:any)=>{
      this.categorys=data;
    })
  }

  categoryOutput(name: string, i: number){
    this.nameCategory.emit(name)
    this.selected=i;
  }
}
