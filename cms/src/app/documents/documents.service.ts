import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (res) => {
          this.documents = res.documents;
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }, (error: any) => {
          console.log('something bad happened...');
        }
      );
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newDocument.id = '';
    const strDocument = JSON.stringify(newDocument);

    this.http.post<{ message: string, documents: Document[] }>('http://localhost:3000/documents',
      strDocument,
      { headers: headers })
      .subscribe(
        (res) => {
          this.documents = res.documents;
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch<{ message: string, documents: Document[]}>('http://localhost:3000/documents/' + originalDocument.id
      , strDocument
      , { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        });

    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    this.http.delete<{ message: string, documents: Document[] }>('http://localhost:3000/documents/' + document.id)
    // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (responseData) => {
          this.documents = responseData.documents;
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        });

    // let pos = this.documents.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }
    // this.documents.splice(pos, 1);
    // this.storeDocuments();
  }
}