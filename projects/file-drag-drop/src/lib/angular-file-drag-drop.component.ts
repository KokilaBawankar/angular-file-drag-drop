import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'lib-file-drag-drop',
  template: `
    <div class="file-drop">
      <div class="file-drop-box"
           libFileDrop
           (droppedFiles)="onFileDropOrSelect($event)"
           (dropAreaHover)="onDropAreaHover($event)"
           [class.drop-section-hover]="dropAreaHover">
        <h5 class="text-info file-drop-box-text" >Drop files here..</h5>
        <input type="file"
               class="btn btn-info file-input-button"
               (change)="onFileDropOrSelect($event.target.files)" multiple>
      </div>
      <div class="list-group selected-file-list" *ngIf="files.length != 0 ">
        <div *ngFor="let file of files">{{file.name}}</div>
      </div>
    </div>
  `,
  styles: [
    `.file-drop{
      width: 500px;
      height: 300px;
      display: block;
      margin-top: 25px;
    }

    .file-drop-box{
      width: 100%;
      height: 100px;
      border: 2px dotted #17a2b8;
      border-radius: 30px;
      justify-content: center;
      align-items: center;
      display: flex
    }

    .file-drop-box-text{
      font-size: 15px;
      font-weight: 400
    }

    .file-input-button{
      width: 130px
    }

    .selected-file-list{
      margin-left: 10px;
      margin-top: 10px
    }

    .drop-section-hover{
      background-color: lightgray;
    }
    `
  ]
})
export class AngularFileDragDropComponent {

  files = [];
  dropAreaHover = false;
  @Output() select = new EventEmitter();
  @Output() dropAreaHovering = new EventEmitter();

  onFileDropOrSelect(files) {
    this.files = files;
    this.select.emit(files);
  }

  onDropAreaHover(event) {
    this.dropAreaHover = event;
  }

}
