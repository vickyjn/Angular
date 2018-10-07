import { Component } from '@angular/core';
import { BaseService } from './base.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'compiler';
  source;
  input;
  language = '';
  languages = [ // C, CPP, CPP11, CLOJURE, CSHARP, JAVA, JAVASCRIPT, HASKELL, PERL, PHP, PYTHON, RUBY
     { key: 'C', name: 'C' },
     { key: 'CPP', name: 'C++' },
     { key: 'CPP11', name: 'C++11' },
     { key: 'CLOJURE', name: 'Clojure' },
     { key: 'CSHARP', name: 'C#' },
     { key: 'JAVA', name: 'Java' },
     { key: 'JAVASCRIPT', name: 'JavaScript' },
     { key: 'HASKELL', name: 'Haskell' },
     { key: 'PERL', name: 'Perl' },
     { key: 'PHP', name: 'PHP' },
     { key: 'PYTHON', name: 'Python' },
     { key: 'RUBY', name: 'Ruby' }
  ];
  constructor(public _baseService: BaseService) {}

  compileCode() {
    this._baseService.compile(this.source, this.language, this.input).subscribe((res) => {
      this.language = '';
      console.log(res);
    });
  }
}
