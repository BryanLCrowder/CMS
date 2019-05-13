import { Component, Input } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature  = 'documents';
  switchView(feature: string){
  this.loadedFeature  = feature;}
  title = 'cms';
}
