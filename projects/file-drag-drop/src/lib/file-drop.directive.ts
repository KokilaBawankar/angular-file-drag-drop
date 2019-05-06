import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[libFileDrop]'
})
export class FileDropDirective {

  @Output() droppedFiles = new EventEmitter();
  @Output() dropAreaHover = new EventEmitter();
  files: any[] = [];
  constructor() { }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    event.preventDefault();
    this.getFiles(event)
      .then(() => {
        console.log('files', this.files);
        this.droppedFiles.emit(this.files);
        this.dropAreaHover.emit(false);
      });
  }
  @HostListener('dragover', ['$event'])
  onDropAreaHover(event) {
    event.preventDefault();
    this.dropAreaHover.emit(true);
  }
  @HostListener('dragleave', ['$event'])
  onDropAreaLeave(event) {
    event.preventDefault();
    this.dropAreaHover.emit(false);
  }


  getFiles(event) {

    event.dataTransfer.items.reduce((files, item, index) => {
      if (item.webkitGetAsEntry().isDirectory) {
        this.getFileSystemEntry(item.webkitGetAsEntry());
      } else {
        files.push(event.dataTransfer.files[index]);
      }
    });

    return new Promise((resolve, reject) => {
      for (let i = 0 ; i < event.dataTransfer.items.length ; i++) {
        if (event.dataTransfer.items[i].webkitGetAsEntry().isDirectory) {
          this.getFileSystemEntry(event.dataTransfer.items[i].webkitGetAsEntry());
        } else {
          this.files.push(event.dataTransfer.files[i]);
        }
      }
      return resolve();
    });
  }

  getFileSystemEntry(dirEntry) {
    return new Promise((resolve, reject) => {
      const dirReader = dirEntry.createReader();
      dirReader.readEntries(fileEntries => {
        if (fileEntries.length !== 0) {
          fileEntries.forEach(entry => {
            if (entry.isDirectory) {
              this.getFileSystemEntry(entry);
            } else {
              entry.file(file => {
                console.log('#file#', file);
                this.files.push(file);
              });
            }
          });
        }
      });
      resolve();
    });
  }

  // getFiles(event) {
  //   return new Promise((resolve, reject) => {
  //     for (let i = 0 ; i < event.dataTransfer.items.length ; i++) {
  //       if (event.dataTransfer.items[i].webkitGetAsEntry().isDirectory) {
  //         this.getFileSystemEntry(event.dataTransfer.items[i].webkitGetAsEntry());
  //       } else {
  //         this.files.push(event.dataTransfer.files[i]);
  //       }
  //     }
  //     return resolve();
  //   });
  // }
  //
  // getFileSystemEntry(dirEntry) {
  //   return new Promise((resolve, reject) => {
  //     const dirReader = dirEntry.createReader();
  //     dirReader.readEntries(fileEntries => {
  //       if (fileEntries.length !== 0) {
  //         fileEntries.forEach(entry => {
  //           if (entry.isDirectory) {
  //             this.getFileSystemEntry(entry);
  //           } else {
  //             entry.file(file => {
  //               console.log('#file#', file);
  //               this.files.push(file);
  //             });
  //           }
  //         });
  //       }
  //     });
  //     resolve();
  //   });
  // }
}
