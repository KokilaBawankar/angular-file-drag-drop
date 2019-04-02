import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFileDragDropService} from './angular-file-drag-drop.service';

@Component({
  selector: 'lib-file-drag-drop',
  template: `
    <div class="file-drop">
      <span class="supported-file-format" *ngIf="showSupportedFormats">Supported file types {{acceptedFormats}}</span>
      <div class="file-drop-box"
           libFileDrop
           (droppedFiles)="onFileDropOrSelect($event)"
           (dropAreaHover)="onDropAreaHover($event)"
           [class.drop-section-hover]="dropAreaHover">
        <h5 class="text-info file-drop-box-text">Drop files here..</h5>
        <input type="file"
               class="btn btn-info file-input-button"
               [accept]="acceptedFormats"
               (change)="onFileDropOrSelect($event.target.files)" multiple>
      </div>
      <div>
        <button type="reset" class="submit-button button-side-space" [disabled]="files.length === 0 || disableSubmit"
                (click)="onSubmit()">
          {{submitBtnText}}
        </button>
        <button type="submit" class="reset-button button-side-space" [disabled]="files.length === 0" (click)="onReset()">Reset</button>
      </div>
      <div class="list-group selected-file-list" *ngIf="files.length != 0 ">
        <div *ngFor="let file of files">
          <span>{{file.name}}</span>
          <span class="remove-file" *ngIf="removeButton" (click)="removeFile(file)">
            <svg class="remove-file" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <circle cx="256" cy="256" r="256"/>
              <path d="M510.28,285.304L367.912,142.936L150.248,368.608l140.928,140.928
	          C406.352,493.696,497.056,401.288,510.28,285.304z"/>
              <g>
                <path style="fill:#FFFFFF;" d="M354.376,371.536c-5.12,0-10.232-1.952-14.144-5.856L146.408,171.848
		            c-7.816-7.816-7.816-20.472,0-28.28s20.472-7.816,28.28,0L368.52,337.4c7.816,7.816,7.816,20.472,0,28.28
		            C364.608,369.584,359.496,371.536,354.376,371.536z"/>
                <path style="fill:#FFFFFF;" d="M160.544,371.536c-5.12,0-10.232-1.952-14.144-5.856c-7.816-7.816-7.816-20.472,0-28.28
		             l193.832-193.832c7.816-7.816,20.472-7.816,28.28,0s7.816,20.472,0,28.28L174.688,365.68
		            C170.784,369.584,165.664,371.536,160.544,371.536z"/>
              </g>
            </svg>
          </span>
          <span class="invalid-feedback" style="display: initial">
            {{file.restrictedBy && file.restrictedBy === 'size' ? 'Maximum file size should be ' + maxSize + 'MB'
            : file.restrictedBy && file.restrictedBy === 'type' ? 'File type not accepted.' : ''}}
          </span>
        </div>
      </div>
      <div class="invalid-feedback" style="display: initial" *ngIf="showMaxFilesError">Only {{maxFiles}} files are allowed to select.</div>
    </div>
  `,
  styles: [
      `.file-drop {
      width: 100%;
      height: 100%;
      display: block;
      margin-top: 25px;
    }

    .file-drop-box {
      width: 100%;
      height: 100px;
      border: 2px dotted #17a2b8;
      border-radius: 30px;
      justify-content: center;
      align-items: center;
      display: flex
    }

    .file-drop-box-text {
      font-size: 15px;
      font-weight: 400;
      margin-right: 5px;
    }

    .file-input-button {
      width: 130px
    }

    .button-side-space {
      margin: 5px;
    }

    .submit-button {
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 8px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      border-radius: 5px;
    }

    .submit-button:not([disabled]):hover {
      background-color: #26882a;
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .reset-button {
      background-color: #008CBA; /* Blue */
      border: none;
      color: white;
      padding: 8px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      border-radius: 5px;
    }

    .reset-button:not([disabled]):hover {
      background-color: #2d7992;
    }

    .reset-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .supported-file-format {
      color: #808080ad;
      font-size: 11px;
    }

    .selected-file-list {
      margin-left: 10px;
      margin-top: 10px
    }

    .remove-file {
      width: 20px;
      height: 20px;
      margin-left: 3px;
      margin-right: 3px;
    }

    .drop-section-hover {
      background-color: lightgray;
    }
    `
  ]
})
export class AngularFileDragDropComponent implements OnInit {

  files: any[] = [];
  dropAreaHover = false;
  showMaxFilesError = false;
  disableSubmit = false;
  @Input() maxSize = 2;
  @Input() maxFiles = null;
  @Input() acceptedFormats: string[];
  @Input() removeButton = true;
  @Input() showSupportedFormats = true;
  @Input() submitBtnText = 'Done';

  @Output() select = new EventEmitter();
  @Output() dropAreaHovering = new EventEmitter();

  constructor(private angularFileDragDropService: AngularFileDragDropService) {
  }

  ngOnInit(): void {
    this.angularFileDragDropService.maxSize = this.maxSize * 1024 * 1024;
    for (let i = 0; i < this.acceptedFormats.length; i++) {
      if (!(this.acceptedFormats[i].includes('image/') || this.acceptedFormats[i].includes('audio/') || this.acceptedFormats[i].includes('video/') || this.acceptedFormats[i].includes('application/'))) {
        if (this.acceptedFormats[i].charAt(0) !== '.') {
          this.acceptedFormats[i] = '.' + this.acceptedFormats[i];
        }
      }
    }
  }

  onFileDropOrSelect(files) {
    this.files = [];
    this.disableSubmit = false;
    if (this.maxFiles != null && files.length <= this.maxFiles || this.maxFiles == null) {
      this.showMaxFilesError = false;
      for (let i = 0; i < files.length; i++) {
        let pushedFlag = false;
        if (this.angularFileDragDropService.chechFileSize(files[i].size)) {
          for (let j = 0; j < this.acceptedFormats.length; j++) {
            if ((files[i].name.includes(this.acceptedFormats[j]) || files[i].type === this.acceptedFormats[j])) {
              this.files.push(files[i]);
              pushedFlag = true;
              break;
            }
          }
          if (!pushedFlag) {
            const file = files[i];
            file.restrictedBy = 'type';
            this.files.push(file);
            this.disableSubmit = true;
          }
        } else {
          const file = files[i];
          file.restrictedBy = 'size';
          this.files.push(file);
          this.disableSubmit = true;
        }
      }
    } else {
      this.showMaxFilesError = true;
      this.disableSubmit = true;
    }
  }

  onDropAreaHover(event) {
    this.dropAreaHover = event;
  }

  removeFile(file) {
    this.files = this.files.filter(f => file !== f);
    this.disableSubmit = false;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].restrictedBy) {
        this.disableSubmit = true;
      }
    }
  }

  onSubmit() {
    this.select.emit(this.files);
    this.files = [];
  }

  onReset() {
    this.files = [];
    this.disableSubmit = true;
  }

}
