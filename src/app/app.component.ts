import { Component, ViewChild, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable, interval, Subscription } from 'rxjs';
import { Timer } from './models/timer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hello-nonsan';

  startAt: number;
  isDone: boolean = false;

  currentValue = '';

  timerSet: Timer;

  currentSubscription: Subscription;


  ngOnInit(): void {

    if (this.isOverTime(new Date(2020, 3, 23, 14))) { // 현재 시간이 목표시간보다 크면
      this.isDone = true;
      this.startAt = this.getAfterTimeSec();
      console.log("훈련중임!");
    } else { // 카운트 다운 필요
      this.startAt = this.getStartTimeSec();
    }

    this.startBeforeTime();
  }

  public startBeforeTime() {
    this.currentValue = this.formatValue(this.startAt);

    const t: Observable<number> = interval(1000);

    this.currentSubscription = t.pipe(take(this.startAt)).map(v => { return this.startAt - (v + 1) }).subscribe(v => {
      this.currentValue = this.formatValue(v);
    }, e => { }, () => {
      this.isDone = true;
      this.stop();
    });
  }

  public stop() {
    this.currentSubscription.unsubscribe();
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

  private getStartTimeSec() {

    let goalDay: Date = new Date(2020, 2, 26, 14);

    let betweenDay = this.getBetweenDay(goalDay);

    return betweenDay / 1000;
  }

  private getAfterTimeSec() {

    let goalDay: Date = new Date(2020, 3, 23, 14);

    let betweenDay = this.getBetweenDay(goalDay);

    return betweenDay / 1000;
  }

  private getBetweenDay(goalDay: Date) {
    let today: Date = new Date();

    let betweenDay = (goalDay.getTime() - today.getTime());

    console.log("Get Between Day --> ", betweenDay);

    return betweenDay;
  }

  private isOverTime(goalDay: Date): boolean {
    let today: Date = new Date();

    let betweenDay = (goalDay.getTime() - today.getTime());

    return (betweenDay >= 0) ? true : false;
  }


}



