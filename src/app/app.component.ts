import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'money-calc';
  instructionsText: string = 'Show Instructions';
  shown = false;
  data: number[][] = [];
  toggle(): void{
    if (this.shown){
      // Change state from shown to hidden
      this.instructionsText = 'Show Instructions';
    }
    else{
      this.instructionsText = 'Hide Instructions';
    }
    this.shown = !this.shown;
  }
}
