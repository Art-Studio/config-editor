import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { GetFileComponent } from './get-file/get-file.component';
import { GetObjectComponent } from './get-object/get-object.component';
import { SaveFileComponent } from './save-file/save-file.component';
import { GetEventsDirective } from './directives/get-events.directive';

@NgModule({
  declarations: [
    AppComponent,
    GetFileComponent,
    GetObjectComponent,
    SaveFileComponent,
    GetEventsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    FormsModule
  ],
  providers: [
    DataService,
    SaveFileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
