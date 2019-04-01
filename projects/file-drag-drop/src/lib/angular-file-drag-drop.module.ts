import { NgModule } from '@angular/core';
import { AngularFileDragDropComponent } from './angular-file-drag-drop.component';
import {FileDropDirective} from './file-drop.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AngularFileDragDropComponent, FileDropDirective],
  exports: [AngularFileDragDropComponent]
})
export class AngularFileDragDropModule { }
