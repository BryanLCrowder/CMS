import { Injectable, EventEmitter } from '@angular/core';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() { 
    this.messages = MOCKMESSAGES;
    this.getMessages();

  }

  getMessages() {
    return this.messages.slice();
   }
   
   getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }
  addMessages(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
    }
  //addMessages(messages: Message[]) {
 
   // this.messages.push(...messages);
   // this.messageChangeEvent.emit(this.messages.slice());
   // }
}
