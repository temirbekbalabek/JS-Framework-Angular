import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyService } from './my-service.service';
import { CONFIG_PROVIDER } from './config';
import { RequestInterceptor } from './interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CustomMaterialModule } from './custom-material.module';
import { UiModule } from './ui/ui.module';
import { HeaderComponent } from './ui/components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FormsModule,
    UiModule
  ],
  providers: [
    MyService,
    CONFIG_PROVIDER,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
