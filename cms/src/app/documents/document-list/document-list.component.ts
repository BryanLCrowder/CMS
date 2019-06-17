import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  document: Document[] = [];
  subscription: Subscription;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

    ngOnInit() {
      this.document = this.documentService.getDocuments();
      this.subscription = this.documentService.documentChangedEvent
        .subscribe(
          (documentsList: Document[]) => {
            this.document = documentsList;
          }
        );
    }
    onNewDocument() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  }
