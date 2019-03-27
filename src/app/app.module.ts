import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FiledropDirective } from './filedrop.directive';
import {FileDropModule} from 'ngx-file-drop';

@NgModule({
  declarations: [
    AppComponent,
    FiledropDirective
  ],
  imports: [
    BrowserModule,
    FileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
