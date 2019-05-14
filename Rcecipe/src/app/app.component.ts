import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  onNavigate(feature:string){
this.loadedFeature = feature;
  }
  title = 'CMS';
}