import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';
import { Timer } from './models/timer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'hello-nonsan';

  step: string;

  startAt: number;

  isDone: boolean = false;
  isDoneTraining: boolean = false;

  currentValue = '';

  countSubscription$: Subscription;

  testSubscription$: Subscription;

  ngOnInit(): void {

    this.setStep();
    console.log("step --->", this.step);
    if (this.isEndNonsan()) { // 훈련 끝
      this.currentValue = "끝났당~~"
    } else {
      if (this.isStartNonsan()) { // 훈련 시작
        this.startAt = this.calStartAt(this.endTime)
      } else { // 훈련 전
        this.startAt = this.calStartAt(this.startTime)
      }
      this.startCountDown();
    }
  }

  public startCountDown() {
    this.currentValue = this.formatValue(this.startAt);

    const t: Observable<number> = interval(1000);

    this.countSubscription$ = t.pipe(take(this.startAt)).map(v => { return this.startAt - (v + 1) }).subscribe(v => {
      this.currentValue = this.formatValue(v);
      console.log(v);
    }, e => {
      console.log("error!", e);
    }, () => {
      console.log("끝!!!")
      this.setStep();

      this.stop();
    });
  }

  public testSub() {

  }

  public stop() {
    this.countSubscription$.unsubscribe();
  }

  private setStep(): void {
    if (this.isStartNonsan()) {
      this.step = 'START';
    }
    else if (this.isEndNonsan()) {
      this.step = 'END';
    } else {
      this.step = 'NORMAL';
    }
    console.log("Set setep ---------->", this.step);
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

  private calStartAt(goalDay: Date) {
    let betweenDay = this.calBetweenDay(goalDay);
    return betweenDay / 1000;
  }

  private calBetweenDay(goalDay: Date) {
    let today: Date = new Date();

    let betweenDay = (goalDay.getTime() - today.getTime());

    console.log("Get Between Day --> ", betweenDay);

    return betweenDay;
  }

  private isOverTime(goalDay: Date): boolean {
    let today: Date = new Date();

    let betweenDay = (goalDay.getTime() - today.getTime());

    return (betweenDay <= 0) ? true : false;
  }


  private isStartNonsan() {
    return (this.isOverTime(this.startTime) ? true : false);
  }

  private isEndNonsan() {
    return (this.isOverTime(this.endTime) ? true : false);
  }


  get startTime(): Date { return new Date(2020, 2, 26, 14) }
  get endTime(): Date { return new Date(2020, 3, 23, 14) }

  // get startTime(): Date { return new Date(2020, 2, 24, 14) }
  // get endTime(): Date { return new Date(2020, 2, 24, 17, 3, 0) }

  // get startTime(): Date { return new Date(2020, 2, 23, 14) }
  // get endTime(): Date { return new Date(2020, 2, 23, 15) }

  ngOnDestroy(): void {
    this.stop();
  }
}



