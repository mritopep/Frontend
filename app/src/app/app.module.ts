import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HomeComponent } from './components/home/home.component';
import { FeatureComponent } from './components/feature/feature.component';
import { AboutComponent } from './components/about/about.component';
import { DndDirective } from './directives/dnd.directive';
import { ProgressComponent } from './components/progress/progress.component';
import { ImgBase64Component } from './components/img-base64/img-base64.component';
import { ScanviewerComponent } from './components/scanviewer/scanviewer.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { OptionComponent } from './components/option/option.component';
import { MatSlideToggleModule}  from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const config: SocketIoConfig = { url: "http://bcb63f7162f4.ngrok.io" , options: {} };
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FileUploaderComponent,
    HomeComponent,
    FeatureComponent,
    AboutComponent,
    DndDirective,
    ProgressComponent,
    OptionComponent,
    ImgBase64Component,
    ScanviewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    MatSlideToggleModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
