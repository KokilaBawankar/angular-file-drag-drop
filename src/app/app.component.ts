import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  files = [];
  dropAreaHover = false;

  onFileDropOrSelect(files) {
    this.files = files;
    console.log(files);
  }

  onDropAreaHover(event) {
    this.dropAreaHover = event;
    console.log(event);
  }
}
