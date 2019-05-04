import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadComponent } from '../UIComponent/upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [
    UploadComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    MatFileUploadModule
  ],
  exports: [
    UploaderComponent,
    MatFileUploadModule

  ]
})
export class UploadModuleModule { }
