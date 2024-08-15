import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-typewriter-text',
  standalone: true,
  imports: [ NgFor ],
  templateUrl: './typewriter-text.component.html',
  styleUrls: ['./typewriter-text.component.css']
})
export class TypewriterTextComponent implements OnInit {
  @Input() fullText: string = '';
  displayedText: string[] = [];
  typingSpeed: number = 100;  // Vitesse de l'animation en ms
  audio!: HTMLAudioElement;

  ngOnInit(): void {
    this.audio = new Audio('assets/sounds/typing-sound.mp3');
    this.audio.loop = true;  // Boucler le son pendant la frappe
    this.typeText();
  }

  typeText(): void {
    let i = 0;
    this.audio.play();
    
    const intervalId = setInterval(() => {
      if (i < this.fullText.length) {
        this.displayedText.push(this.fullText.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
        this.audio.pause();  // Arrêter le son une fois le texte complètement affiché
        this.audio.currentTime = 0;  // Réinitialiser le son pour la prochaine fois
      }
    }, this.typingSpeed);
  }
}
