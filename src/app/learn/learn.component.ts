import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LevelsService } from '../levels.service';
import { StartLvlComponent } from "../start-lvl/start-lvl.component";
import { LevelIconComponent } from "../level-icon/level-icon.component";
import { forkJoin } from 'rxjs';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'app-learn',
    imports: [StartLvlComponent, LevelIconComponent, LoadingComponent],
    templateUrl: './learn.component.html',
    styleUrl: './learn.component.css',
    standalone: true
})
export class LearnComponent implements OnInit, OnChanges{
  levels: any[] = [];
  progress:string = "50%";
  loading: boolean = true;
  @Input({required: true}) idUser: string = "1";
  sections: any = [];


  constructor(private levelsService: LevelsService) {}

  organizeHome(){
    this.levels = [];
    this.levelsService.getSection().subscribe((data1)=>{
      this.sections = data1
      data1.forEach((element:any) => {

      this.levelsService.getLevels(element.id).subscribe((data) => {
      this.levels = data;
      console.log("backend2:", data)

      const groupSizes = [1, 3, 2, 1];
      const groupedLevels: any[][] = [];
      let currentIndex = 0;

      for (const size of groupSizes) {
        const group = this.levels.slice(currentIndex, currentIndex + size);
        groupedLevels.push(group);
        currentIndex += size;
      }

      console.log('Gruppi:', groupedLevels);
      // Ad esempio puoi anche salvarlo per il template:
      this.levels = [];
      this.levels.push(groupedLevels);
      console.log('Gruppi2:', this.levels);


        groupedLevels.forEach((arrayLevel, i) => {
          const observables = arrayLevel.map(level =>
            this.levelsService.getStatus(this.idUser, level.id.toString())
          );

          forkJoin(observables).subscribe(results => {
            let corrects = 0;

            results.forEach((data:any) => {
              console.log(data.status);
              if (data.status === 'success') {
                corrects++;
              }

              if(data.status === 'available'){
                corrects--;
              }
            });

            console.log(corrects);
            if (corrects / arrayLevel.length > 0.5) {
              groupedLevels[i+1].forEach(element => {
                this.levelsService.getStatus(this.idUser, element.id.toString()).subscribe((data:any)=>{
                  if(data.status == "not available"){
                    this.levelsService.updateStatus(this.idUser, element.id, "available").subscribe((data)=>{});
                  }
                })
              });
            }

            groupedLevels.forEach(rowArray=>{
              rowArray.forEach(element => {
                this.levelsService.getStatus(this.idUser, element.id.toString()).subscribe((data:any)=>{
                  if(data.status === "not available"){
                      element.color = '#586771'
                    }
                    if(data.status === "available"){
                      element.color = '#2787D6';
                    }else if(data.status === "success"){
                      element.color = '#72bb3b';
                    }else if(data.status === "failed"){
                      element.color = '#FF4B4B';
                    }
                    
              });
            })
          });
            setTimeout(() => {
        this.loading = false;
      }, 500);
        });
      });
    });
    });
  });
}

ngOnInit() {
  this.organizeHome();
}

  ngOnChanges(changes: SimpleChanges): void {
    this.organizeHome();
  }

}
