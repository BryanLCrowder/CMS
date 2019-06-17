import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './documents.service';


@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documentSelectedEvent: Document;
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe(
      (documents: Document) => {
        this.documentSelectedEvent = documents;
  });
 
  }
}
