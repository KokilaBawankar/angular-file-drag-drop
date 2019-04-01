import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FiledropDirective } from './filedrop.directive';
// import {FileDropModule} from 'ngx-file-drop';
// import {AngularFileUploaderModule} from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    FiledropDirective
  ],
  imports: [
    BrowserModule,
    // FileDropModule,
    // AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
