import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadComponent } from '../UIComponent/upload/upload.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatButtonModule } from '@angular/material';
@NgModule({
  declarations: [
    UploadComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    MatFileUploadModule,
    MatButtonModule
  ],
  exports: [
    UploaderComponent,
    MatFileUploadModule,
    MatButtonModule

  ]
})
export class UploadModuleModule { }
