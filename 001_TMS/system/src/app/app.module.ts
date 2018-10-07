import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SideNavComponent } from './feature/side-nav/side-nav.component';
import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';
import { BaseComponent } from './feature/base/base.component';
import { HeaderComponent } from './feature/header/header.component';
import { BaseService } from './services/base.service';
import { ProfileComponent } from './feature/profile/profile.component';
import { ImageFilterPipe } from './services/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsComponent } from './feature/profile-details/profile-details.component';
import { TaskEffortComponent } from './feature/task-effort/task-effort.component';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { IndicatorComponent } from './shared/indicator/indicator.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { TagsComponent } from './shared/tags/tags.component';
import { ActivitylistComponent } from './feature/activity-list/activity-list.component';
import { ActivitylistDetailsComponent } from './feature/activity-list-details/activity-list-details.component';
import { EditProfileComponent } from './feature/edit-profile/edit-profile.component';
import { RatingComponent } from './shared/rating/rating.component';
import { ViewActivityComponent } from './feature/view-activity/view-activity.component';
import { StackedBarChartComponent } from './shared/stacked-bar-chart/stacked-bar-chart.component';
import { ActivityHistoryComponent } from './feature/activity-history/activity-history.component';
import { GroupedBarChartComponent } from './shared/grouped-bar-chart/grouped-bar-chart.component';
import { GroupViewActivityComponent } from './feature/group-view-activity/group-view-activity.component';
import { SkillCarouselComponent } from './shared/skill-carousel/skill-carousel.component';
import { AssignCompetencyComponent } from './feature/assign-competency/assign-competency.component';
import { ActivityFilterComponent } from './feature/activity-filter/activity-filter.component';
import { LevelComponent } from './shared/level/level.component';
 
const appRoutes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'side-nav', component: SideNavComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-detail/:id', component: ProfileDetailsComponent },
  { path: 'activity', component: TaskEffortComponent },
  { path: 'activitylist', component: ActivitylistComponent },
  { path: 'activitylist-details', component: ActivitylistDetailsComponent },
  { path: 'edit-profile', component: EditProfileComponent},
  { path: 'view-activity', component: ViewActivityComponent},
  { path: 'bar', component: StackedBarChartComponent},
  { path: 'activity-history', component: ActivityHistoryComponent},
  { path: 'group-view-activity', component: GroupViewActivityComponent},
  { path: 'assign-competency', component: AssignCompetencyComponent},
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    PageNotFoundComponent,
    BaseComponent,
    HeaderComponent,
    ProfileComponent,
    ImageFilterPipe,
    ProfileDetailsComponent,
    TaskEffortComponent,
    BreadcrumsComponent,
    IndicatorComponent,
    BarChartComponent,
    ActivitylistComponent,
    ActivitylistDetailsComponent,
    EditProfileComponent,
    RatingComponent,
    TagsComponent,
    ViewActivityComponent,
    StackedBarChartComponent,
    ActivityHistoryComponent,
    GroupedBarChartComponent,
    GroupViewActivityComponent,
    SkillCarouselComponent,
    AssignCompetencyComponent,
    ActivityFilterComponent,
    LevelComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Daterangepicker,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      disableTimeOut: true,
      onActivateTick: true,
      tapToDismiss : true
    }),
  ],
  exports: [RouterModule, ImageFilterPipe],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
