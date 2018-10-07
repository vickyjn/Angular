import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'tms-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [BaseService]
})
export class ProfileDetailsComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  id: number;
  sub: any;
  selectedImage: any ={};
  form: FormGroup;
  articleUrl: any;

  constructor(private _Base: BaseService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._Base.getemployeebyid(this.id).subscribe((data) => {
        this.selectedImage = data;
      }, (err) => {
        this._Base.serviceError(err);
      });
    }, (err) => {
      this._Base.serviceError(err);
    });
  }

  back() {
      this.location.back();
  }
}
