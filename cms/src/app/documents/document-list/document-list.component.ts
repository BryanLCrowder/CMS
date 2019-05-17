import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() documentWasSelected = new EventEmitter<Document>();
  documents: Document[] =[
    new Document(1, "CIT366", " This class has taught me a lot about the MEAN stack.", "byui.edu", "none")
,   new Document(1, "CIT365", " Do the Megadesk project.", "byui.edu", "none")     ]
  constructor() { }
  onDocumentSelected(document: Document){
    this.documentWasSelected.emit(document);
  }
  ngOnInit() {
  }

}
