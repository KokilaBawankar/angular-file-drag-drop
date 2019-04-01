import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[libFileDrop]'
})
export class FileDropDirective {

  @Output() droppedFiles = new EventEmitter();
  @Output() dropAreaHover = new EventEmitter();

  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    this.droppedFiles.emit(event.dataTransfer.files);
    this.dropAreaHover.emit(false);
  }
  @HostListener('dragover', ['$event'])
  onDropAreaHover(event) {
    event.preventDefault();
    this.dropAreaHover.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  onDropAreaLeave(event) {
    event.preventDefault();
    this.dropAreaHover.emit(false);
  }

}
