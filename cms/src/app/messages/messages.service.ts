import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable()
export class MessagesService {
    messageChangeEvent = new Subject<Message[]>();
    messages: Message[] = [];
    maxMessageId: number;

    constructor(private http: HttpClient) {
        // this.messages = MOCKMESSAGES;
        this.maxMessageId = this.getMaxId();
    }

    storeMessages() {
        this.messages = JSON.parse(JSON.stringify(this.messages));
        const header = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put('https://cms-project-7eb11.firebaseio.com/messages.json', this.messages, { headers: header})
          .subscribe(
            (messages: Message[]) => {
              this.messageChangeEvent.next(this.messages.slice());
            }
          );
      }

      getMessages() {
        this.http.get('https://cms-project-7eb11.firebaseio.com/messages.json')
          .subscribe(
            (messages: Message[]) => {
              this.messages = messages;
              this.messages.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
              this.messageChangeEvent.next(this.messages.slice());
            }, (error: any) => {
              console.log('something bad happened...');
            }
          );
      }

      getMessage(id: string) {
        for (const message of this.messages) {
          if (message.id === id) {
            return message;
          }
        }
        return null;
      }

      addMessage(newMessage: Message) {
        if (newMessage === null) {
          return;
        }

        this.maxMessageId++;
        newMessage.id = String(this.maxMessageId);
        this.messages.push(newMessage);
        // this.messageChangeEvent.emit(this.messages.slice());
        this.storeMessages();
      }

      getMaxId(): number {
        let maxId = 0;
        for (const message of this.messages) {
          const currentId = +message.id;
          if (currentId > maxId) {
            maxId = currentId;
          }
        }
        return maxId;
      }
}