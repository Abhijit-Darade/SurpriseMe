import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [ NgIf, MatButtonModule],
  template: `<div style="text-align: center; margin-top: 50px;">
      <h1>{{ message }}</h1>
      <button mat-raised-button color="primary" (click)="surpriseMe()">Surprise Me</button>
      <div *ngIf="showMeme">
        <img [src]="randomMeme" alt="Coding Meme" style="margin-top: 20px; max-width: 400px; border-radius: 10px;">
      </div>
    </div>
    `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'surpriseMe';

  message =  "Click the button for meme!" ;
  showMeme = false;
  randomMeme? : string;

  constructor(private http : HttpClient){

  }

  surpriseMe() {
    this.http.get<any>('https://meme-api.com/gimme/programmingmemes').subscribe(
      data => {
        this.randomMeme = data.url;
        this.showMeme = true;
        document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      },
      error => console.log("Error fetching meme : ", error)
    );
  }
  
}
