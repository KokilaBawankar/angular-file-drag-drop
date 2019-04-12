import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngularFileDragDropService {

  maxSize: number;

  checkFileSize(size: number) {
    if (size <= this.maxSize) {
      return true;
    } else {
      return false;
    }
  }

}
