import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

import { Activity, Profile } from '../models/models';

@Injectable()
export class BaseService {
  host = environment.apiUrl;
  servicelist = {
    menu: 'getmenu',
    getemployee: 'getemployee',
    activity: 'activity',
    allactivity: 'allactivity',
    editprofile: 'editprofile',
    activitylist: 'activitylist',
    contributors: 'contributors',
    activityView: 'activityView',
    groupactivityView: 'groupactivityView',
    skills: 'skills',
    activities: 'activities',
    updateCompetency: 'updateCompetency'
  };
  constructor(private http: HttpClient, private toastr: ToastrService) { 
  }

  getSelectedActivity(date: Number) {
    return this.http.get(this.host + this.servicelist.activities + '/' + date);
  }

  getSelectedActivityView(date: Number) {
    return this.http.get(this.host + this.servicelist.activityView + '/' + date);
  }

  getmenu = function () {
    return this.http.get(this.host + this.servicelist.menu);
  };
  /**
   * Getemployee  of base service
   * @owner: Lavanya R
   */
  getemployee = function () {
    return this.http.get(this.host + this.servicelist.getemployee);
  };
  /**
   * Getemployeebyid  of base service
   * @owner: Lavanya R
   */
  getemployeebyid = function (id) {
    return this.http.get(this.host + this.servicelist.getemployee + '/' + id);
  };

  postActivity(data: Activity, isClose: Number) {
    return this.http.post<Activity>(this.host + this.servicelist.activity + '/' + isClose, data);
  }

  getAllActivity() {
    return this.http.get(this.host + this.servicelist.activity);
  }

  getAllUserActivity() {
    return this.http.get(this.host + this.servicelist.allactivity);
  }
  getActivity(date: Number) {
    return this.http.get(this.host + this.servicelist.activity + '/' + date);
  }
  getActivitylist(date: Number) {
    return this.http.get(this.host + this.servicelist.activitylist + '/' + date);
  }

  /**
   * Puts profile
   * @param data
   * @returns
   * @owner: Lavanya R
   */
  putProfile(data: Profile) {
    return this.http.put<Profile>(this.host + this.servicelist.editprofile, data);
  }

  getContributors(query: String) {
    return this.http.get(this.host + this.servicelist.contributors + '/' + query);
  }

  getAdUnits() {
    return this
      .http
      .get(`${this.host}Activity`);
  }

  getntid = function () {
    return this.http.get(`${this.host}getntid`);
  }

  serviceError(error: any) {
    this.toastr.error(error.status + ':' + error.statusText);
  }

  getActivityView() {
    return this.http.get(this.host + this.servicelist.activityView);
  }

  groupActivityView() {
    return this.http.get(this.host + this.servicelist.groupactivityView);
  }

  getSkills() {
    return this.http.get(this.host + this.servicelist.skills);
  }

  updateSkills(data) {
    return this.http.post(this.host + this.servicelist.updateCompetency, data);
  }
}
