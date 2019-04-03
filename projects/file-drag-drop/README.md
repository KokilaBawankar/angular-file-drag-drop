Angular file drag drop is simple multiple files drag and drop module in Angular 7, also allows to select multiple files using button given. It gives selected files array as output and you can do whatever you wanted to with them, for example upload to a server.

## Install 

```
npm i angular-file-drag-drop
```

## Usage

- Import AngularFileDragDropModule in your app.module.ts
```
import {AngularFileDragDropModule} from 'angular-file-drag-drop';
```
```
@NgModule({
  imports: [
      ...,
      AngularFileDragDropModule,
      ...
  ]
})
```
**Example-1 ( with default configuration )**
```
<angular-file-drag-drop (select)="onFileSelect($event)"
                        (dropAreaHovering)="onDropAreaHover($event)">
</angular-file-drag-drop>
```
- select event gives the array of selected files. This event occurs on click of Done button.
- dropAreaHovering event gives the boolean, whether the file drop zone is hovered or not.

**Example-2 ( with custom configuration )**

```
<angular-file-drag-drop [maxSize]="2"
                        [maxFiles]="10"
                        [removeButton]="true"
                        [submitBtnText]="'Upload'"
                        [showSupportedFormats]="true"
                        [acceptedFormats]="['.png', '.jpeg', 'gz','.ppk']"
                        (select)="onFileSelect($event)"
                        (dropAreaHovering)="onDropAreaHover($event)">
</angular-file-drag-drop>
```
There are two button Done and Reset:
- Done button fires the select event and gives the selected files array.
- Reset button resets the selected files.

Properties|Description|Deafault Value
---|---|---
maxSize| Maximum size limit for files in MB.|2 MB
maxFile| Maximum number of files allowed to choose.| Null
removeButton| Boolean to show remove file button or not.| true
acceptedFormats| String array of file formats allowed to choose.| []
showSupportedFormats| Boolean to show supported file format or not. | false
submitBtnText| String to show on Done button.| 'Done'

## Coming Soon:
- Directory upload
