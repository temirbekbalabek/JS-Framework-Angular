import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { DialogPageComponent } from './pages/dialog-page/dialog-page.component';
import { ToastsPageComponent } from './pages/toasts-page/toasts-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogPageComponent,
    ToastsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
