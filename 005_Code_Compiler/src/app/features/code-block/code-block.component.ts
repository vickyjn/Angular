import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements OnInit {
  @Input() value;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  textareaChanged(text) {
    this.valueChange.emit(this.value);
  }

}
