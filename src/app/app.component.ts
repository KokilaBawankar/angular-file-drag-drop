import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files = [];
  dropAreaHover = false;
  config;

  constructor() {
    this.config = {
      multiple: true,
      theme: 'dragNDrop',
      formatsAllowed: '.jpg,.png,.pdf,.docx, .txt,.gif,.jpeg,.pem',
      uploadAPI:  {
        url: 'https://example-file-upload-api'
      },
      maxSize: '50',
      hideProgressBar: false,
      hideResetBtn: false,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Browse Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };
  }


  uploadFiles(files) {
    this.files = files;
    console.log(files);
  }

  dropAreaHovering(event) {
    this.dropAreaHover = event;
    console.log(event);
  }
}
