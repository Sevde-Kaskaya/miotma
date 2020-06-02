import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  
  private id : any;
 
  constructor() { }

  setId(id) {
    this.id = id;
  }
 
  getId(id) {
    return this.id;
  }
}
