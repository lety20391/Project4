import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
// import { SliderComponent } from 'ng5-slider/slider.component';

@NgModule({
  declarations: [
    // SliderComponent
  ],
  imports: [
    CommonModule,
    Ng5SliderModule
  ],
  exports: [
    Ng5SliderModule
  ],
  entryComponents: [
    // SliderComponent
  ]
})
export class MySliderModule { }
