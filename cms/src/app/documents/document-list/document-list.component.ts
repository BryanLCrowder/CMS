import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();
  document: Document[] =[]
  constructor() { }
  onDocumentSelected(document: Document){
    this.documentWasSelected.emit(document);
  }
  ngOnInit() {
  }

}
