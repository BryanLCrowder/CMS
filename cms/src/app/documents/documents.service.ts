import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
documents: Document[]=[];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.getDocuments();
  }
  getDocuments() {
    return this.documents.slice();
   }
   getDocument(id: number): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }
}
