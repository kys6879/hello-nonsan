import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';

import { take } from 'rxjs/operators';
import 'rxjs/add/operator/map';
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

  startAt = 36000;


  @Output()
  counterState = new EventEmitter<string>();

  currentValue = '';

  currentSubscription: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {

  }

  public start() {
    this.currentValue = this.formatValue(this.startAt);
    this.changeDetector.detectChanges();

    const t: Observable<number> = interval(1000);

    this.currentSubscription = t.pipe(take(this.startAt)).map(v => { return this.startAt - (v + 1) }).subscribe(v => {
      this.currentValue = this.formatValue(v);
      this.changeDetector.detectChanges();
    }, err => {
      this.counterState.error(err);
    }, () => {
      this.currentValue = '00:00';
      this.counterState.emit('COMPLETE');
      this.changeDetector.detectChanges();
    });
  }

  public stop() {
    this.currentSubscription.unsubscribe();
    this.counterState.emit('ABORTED');
  }

  private formatValue(v) {

    const days = Math.floor(v / (24 * 60 * 60));
    v -= days * (24 * 60 * 60);

    const hours = Math.floor(v / 3600);
    v -= hours * (60 * 60);

    const minutes = Math.floor((v % 3600) / 60);
    v -= minutes * (60);

    const formattedMinutes = (minutes > 9 ? minutes : '0' + minutes);

    const seconds = Math.floor(v % 60);

    const formattedSeconds = (seconds > 9 ? seconds : '0' + seconds);

    return `${days}일 ${hours}시 ${formattedMinutes}분 ${formattedSeconds}초`;

  }

}
