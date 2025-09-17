import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }


  checkScreenSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
    
      console.log('Larghezza:', width, 'Altezza:', height);
    
    }
}
