import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: HTMLAudioElement = new Audio();

  playAudio(src: string): void {
    this.audio.src = src;
    this.audio.load();
    this.audio.play().catch((err) => {
      console.error('Playback failed:', err);
    });
  }
    correct(){
      this.playAudio("../assets/music/correct.wav");
    }

    wrong(){
      this.playAudio("../assets/music/wrong.wav");
    }
  
}
