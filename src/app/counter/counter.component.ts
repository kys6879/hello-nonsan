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

  startAt = 3603;

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

    this.currentSubscription = t.pipe(take(this.startAt)).map(v => this.startAt - (v + 1)).subscribe(v => {
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

    const hours = Math.floor(v / 3600);

    const minutes = Math.floor(v / 60);

    const formattedMinutes = (minutes > 9 ? minutes : '0' + minutes);

    const seconds = v % 60;

    const formattedSeconds = (seconds > 9 ? seconds : '0' + seconds);

    return `${hours}시간 ${formattedMinutes}분 ${formattedSeconds}초`;


  }

}
