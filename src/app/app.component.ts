import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files = [];
  dropAreaHover = false;

  uploadFiles(files) {
    this.files = files;
    console.log(files);
  }

  dropAreaHovering(event) {
    this.dropAreaHover = event;
    console.log(event);
  }
}
