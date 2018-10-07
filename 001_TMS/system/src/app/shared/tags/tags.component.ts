import { Component, OnInit, Output, EventEmitter, Input, DoCheck } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { Profile } from '../../models/models';
@Component({
  selector: 'tms-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, DoCheck {
  @Output() data = new EventEmitter();
  @Input() selected: Array<Profile> = [];
  @Input() enable: Boolean = true;
  contributors: Array<Profile> = [];
  pauseText: String = 'Searching...';
  searchText: String = '';
  currentQuery;
  constructor(private _service: BaseService) { }

  ngOnInit() {
  }
  ngDoCheck() {
  }
  makeSearch(searchText) {
    const self = this;
    if (searchText && searchText.length >= 3) {
      if (self.currentQuery) {
        self.currentQuery.unsubscribe();
      }
      self.pauseText = 'Searching...';
      self.contributors = [];
      self.currentQuery = self._service.getContributors(searchText).subscribe((response: Array<Profile>) => {
        if (response && response.length) {
          self.contributors = response;
        } else {
          self.pauseText = 'No matches found!';
          self.contributors = [];
        }
      }, (err) => {
        this._service.serviceError(err);
      });
    }
  }

  selectContributor(selected: Profile) {
    const self = this;
    self.searchText = '';
    self.selected = self.selected.filter((contributor: Profile) => {
      return (contributor.id !== selected.id);
    });
    (self.selected).push(selected);
    self.data.emit(self.selected);
  }

  removeTag(selected: Profile) {
    const self = this;
    self.selected = self.selected.filter((contributor: Profile) => {
      return (contributor.id !== selected.id);
    });
    self.data.emit(self.selected);
  }

}
