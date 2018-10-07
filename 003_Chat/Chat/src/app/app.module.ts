import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RouterModule , Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';

import { RouterModule, Routes } from '@angular/router';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLeftComponent } from './components/admin-left/admin-left.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './components/admin-control-sidebar/admin-control-sidebar.component'; 

const appRoutes : Routes =
                [ {path:'' ,component:LoginComponent},
                  {path:'register' ,component:RegisterComponent},
                  {path:'chat' ,component:RegisterComponent},
                  {path:'consultant' ,component:RegisterComponent},
                  {path:'admin' ,component:AdminComponent},
                  {path:'header' ,component:AdminHeaderComponent},
                  {path:'admindetail' ,component:AdminDetailComponent},
                  {path:'admin-left' ,component:AdminLeftComponent}
                ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ConsultantComponent,
    ChatComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminDetailComponent,
    AdminLeftComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports : [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
