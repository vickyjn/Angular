import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceService } from './service/service.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiLineComponent } from './multi-line/multi-line.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ViewIndexComponent } from './view-index/view-index.component';
import { BarLineComponent } from './bar-line/bar-line.component';

const appRoutes: Routes = [
  { path: '', component: ViewIndexComponent },
  { path: 'multi-line', component: MultiLineComponent },
  {path: 'bar-line', component: BarLineComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    MultiLineComponent,
    FilterBarComponent,
    ViewIndexComponent,
    BarLineComponent
  ],
  imports: [
    BrowserModule,
    Daterangepicker,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ServiceService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
