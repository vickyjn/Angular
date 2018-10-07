
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CodeBlockComponent } from './features/code-block/code-block.component';
@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    CodeBlockComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
