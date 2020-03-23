import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Timer } from '../models/timer.model';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {

  // 목표시간을 입력하면
  // 현재시간에서 빼서 알려줌

  // 현재 시간을 초로 구하고
  // 목표시간을 초로 구한걸 뻄

  // 목표시간까지 남은 초를 구함





  @Output()
  counterState = new EventEmitter<string>();



  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }


}
