import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FruitListComponent } from './fruit-list/fruit-list.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    FruitListComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
