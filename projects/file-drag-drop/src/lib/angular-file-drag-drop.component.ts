import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFileDragDropService} from './angular-file-drag-drop.service';

@Component({
  selector: 'angular-file-drag-drop',
  template: `
    <div class="afdd-file-drop">
      <span class="afdd-file-drop-box-text" *ngIf="showSupportedFormats">Supported file types {{acceptedFormats}}</span>
      <div class="afdd-file-drop-box"
           libFileDrop
           (droppedFiles)="onFileDropOrSelect($event)"
           (dropAreaHover)="onDropAreaHover($event)"
           [class.afdd-drop-section-hover]="dropAreaHover">
        <h5 class="afdd-file-drop-box-text">Drop files here..</h5>
        <input *ngIf="dirAllowed"
               type="file"
               id="select-folder"
               class="afdd-input-type-file-folder"
               webkitdirectory mozdirectory msdirectory odirectory directory
               (change)="onFileDropOrSelect($event.target.files)">
        <label for="select-folder">
          <svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 487.189 487.189" style="enable-background:new 0 0 487.189 487.189;" xml:space="preserve">
            <g fill="#1c5490">
              <g  fill="#1c5490">
                <path d="M470.766,201.645H328.514c-0.679,12.523-5.831,23.854-14.075,32.277h140.188v107.525l-16.752-58.983
                c-1.971-6.934-8.307-11.726-15.525-11.726H80.981v-89.762h98.881v-32.277H64.843c-8.92,0-16.139,7.225-16.139,16.139v105.9H16.427
                c-5.059,0-9.834,2.371-12.877,6.406c-3.057,4.043-4.033,9.276-2.647,14.146l46.049,162.18
                c3.374,11.881,14.224,20.077,26.574,20.075l385.762-0.065c15.253-0.003,27.615-12.368,27.615-27.62V217.783
                C486.903,208.871,479.687,201.645,470.766,201.645z"/>
                  <path d="M486.902,487.174v-0.14C486.836,487.162,486.828,487.219,486.902,487.174z"/>
              </g>
              <path d="M179.373,101.74h32.766v97.171c0,9.865,7.975,17.848,17.824,17.848h48.699c9.867,0,17.857-7.982,17.857-17.848V101.74
              h32.75c5.404,0,10.305-3.27,12.387-8.282c2.064-4.988,0.932-10.756-2.914-14.594L263.783,3.931C261.184,1.314,257.748,0,254.313,0
              c-3.42,0-6.855,1.314-9.473,3.931l-74.924,74.934c-3.861,3.838-4.98,9.605-2.898,14.594
              C169.098,98.471,173.967,101.74,179.373,101.74z"/>
            </g>
          </svg> Folder</label>
        <input type="file"
               id="select-files"
               class="afdd-input-type-file-folder"
               [accept]="acceptedFormats"
               (change)="onFileDropOrSelect($event.target.files)" multiple>
        <label for="select-files">
          <svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 487.189 487.189" style="enable-background:new 0 0 487.189 487.189;" xml:space="preserve">
            <g fill="#1c5490">
              <g  fill="#1c5490">
                <path d="M470.766,201.645H328.514c-0.679,12.523-5.831,23.854-14.075,32.277h140.188v107.525l-16.752-58.983
                c-1.971-6.934-8.307-11.726-15.525-11.726H80.981v-89.762h98.881v-32.277H64.843c-8.92,0-16.139,7.225-16.139,16.139v105.9H16.427
                c-5.059,0-9.834,2.371-12.877,6.406c-3.057,4.043-4.033,9.276-2.647,14.146l46.049,162.18
                c3.374,11.881,14.224,20.077,26.574,20.075l385.762-0.065c15.253-0.003,27.615-12.368,27.615-27.62V217.783
                C486.903,208.871,479.687,201.645,470.766,201.645z"/>
                <path d="M486.902,487.174v-0.14C486.836,487.162,486.828,487.219,486.902,487.174z"/>
              </g>
              <path d="M179.373,101.74h32.766v97.171c0,9.865,7.975,17.848,17.824,17.848h48.699c9.867,0,17.857-7.982,17.857-17.848V101.74
              h32.75c5.404,0,10.305-3.27,12.387-8.282c2.064-4.988,0.932-10.756-2.914-14.594L263.783,3.931C261.184,1.314,257.748,0,254.313,0
              c-3.42,0-6.855,1.314-9.473,3.931l-74.924,74.934c-3.861,3.838-4.98,9.605-2.898,14.594
              C169.098,98.471,173.967,101.74,179.373,101.74z"/>
            </g>
          </svg> Files</label>

      </div>
      <div>
        <button type="reset" class="afdd-buttons afdd-submit-button afdd-button-side-space" [disabled]="files.length === 0 || disableSubmit"
                (click)="onSubmit()">
          {{submitBtnText}}
        </button>
        <button type="submit" class="afdd-buttons afdd-reset-button afdd-button-side-space" [disabled]="files.length === 0" (click)="onReset()">Reset</button>
      </div>
      <div class="list-group afdd-selected-file-list" *ngIf="files.length != 0 ">
        <div *ngFor="let file of files">
          <span>{{file.name}}</span>
          <span class="afdd-remove-file" *ngIf="removeButton" (click)="removeFile(file)">
            <svg class="afdd-remove-file" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
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
      `
      .afdd-file-drop {
        width: 100%;
        height: 100%;
        display: block;
        margin-top: 25px;
      }
      .afdd-file-drop-box {
        width: 100%;
        height: 150px;
        border: 2px dotted #1c5490;
        border-radius: 30px;
        justify-content: center;
        align-items: center;
        display: flex
      }
      .afdd-file-drop-box-text {
        font-size: 15px;
        font-weight: 400;
        margin-right: 5px;
        color: #1c5490;
      }
      .afdd-input-type-file-folder {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      .afdd-input-type-file-folder + label {
        font-size: 20px;
        font-weight: 700;
        color: #1c5490;
        background-color: transparent;
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
        padding: 5px 15px 5px 15px;
        border: 1px solid #1c5490;
      }
      .afdd-input-type-file-folder + label * {
        pointer-events: none;
      }
      .afdd-input-type-file-folder:focus + label,
      .afdd-input-type-file-folder + label:hover,
      .afdd-input-type-file-folder.afdd-has-focus + label {
        /*background-color: #1c5490;*/
        /*color: #fff;*/
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
      }
      .afdd-button-side-space {
        margin: 5px;
      }
      .afdd-buttons{
        border: none;
        color: white;
        padding: 7px 19px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        border-radius: 5px;
        font-weight: 500;
      }
      .afdd-submit-button {
        background-color: #4CAF50; /* Green */
      }
      .afdd-reset-button {
        background-color: #008CBA;
      }
      .afdd-submit-button:not([disabled]):hover {
        background-color: #26882a;
      }
      .afdd-reset-button:not([disabled]):hover {
        background-color: #2d7992;
      }
      .afdd-submit-button:disabled,
      .afdd-reset-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .afdd-selected-file-list {
        margin-left: 10px;
        margin-top: 10px
      }
      .afdd-remove-file {
        width: 20px;
        height: 20px;
        margin-left: 3px;
        margin-right: 3px;
      }
      .afdd-drop-section-hover {
        background-color: lightgray;
      }
    `
  ]
})
export class AngularFileDragDropComponent implements OnInit, AfterViewInit {

  files: any[] = [];
  dropAreaHover = false;
  showMaxFilesError = false;
  disableSubmit = false;
  @Input() maxSize = 2;
  @Input() maxFiles = null;
  @Input() acceptedFormats = [];
  @Input() removeButton = true;
  @Input() showSupportedFormats = false;
  @Input() submitBtnText = 'Done';
  @Input() dirAllowed = false;

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

  ngAfterViewInit(): void {
    document.getElementById('select-folder').addEventListener('focus', function () {
      document.getElementById('select-folder').classList.add('afdd-has-focus');
    });
    document.getElementById('select-folder').addEventListener('blur', function () {
      document.getElementById('select-folder').classList.remove('afdd-has-focus');
    });
    document.getElementById('select-files').addEventListener('focus', function () {
      document.getElementById('select-files').classList.add('afdd-has-focus');
    });
    document.getElementById('select-files').addEventListener('blur', function () {
      document.getElementById('select-files').classList.remove('afdd-has-focus');
    });
  }

  onFileDropOrSelect(files) {
    this.files = [];
    this.disableSubmit = false;
    if (this.maxFiles != null && files.length <= this.maxFiles || this.maxFiles == null) {
      this.showMaxFilesError = false;
      for (let i = 0; i < files.length; i++) {
        let pushedFlag = false;
        if (this.angularFileDragDropService.checkFileSize(files[i].size)) {
          if (this.acceptedFormats.length !== 0) {
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
            this.files = files;
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
    const files = [];
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i] !== file) {
        files.push(this.files[i]);
      }
    }
    this.files = files;
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
