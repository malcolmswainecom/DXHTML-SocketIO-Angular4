import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class GanttService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:8080'; 
  private socket;

   sendModel(model)
   {
    this.socket.emit('send-model', model);   
   }

   getModel() 
   {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('get-model', (data) => {
        
        console.log('in gantt service get model');
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 
} 