import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-pagenotfound',
  imports: [RouterLink],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {
 
  constructor(){ 
  }
}
