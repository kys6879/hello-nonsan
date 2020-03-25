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

  topMessage: string;

  ngOnInit(): void {

    this.setStep();
    console.log("#ngOnInit 설정된 step 은 --> !",this.step);

    this.setTopMessage();

    if(this.step === 'END') {
        this.currentValue = "끝났다! 집에가자~~";
        return ;
    }

    if (this.step === 'START') { // 훈련 시작
      this.startAt = this.calStartAt(this.endTime)
    } 
    else { // 훈련 전
      this.startAt = this.calStartAt(this.startTime)
    }


    this.startCountDown();
  }

  public startCountDown() {
    this.currentValue = this.formatValue(this.startAt);

    const t: Observable<number> = interval(1000);

    console.log("#startCountDown ---> this.startAt -->" , this.startAt);
    this.countSubscription$ = t.pipe(take(this.startAt)).map(v => {return this.startAt - (v + 1) }).subscribe(v => {
      this.currentValue = this.formatValue(v);
    }, (e) => {}, () => {
    });
  }

  public testSub() {

  }

  public stop() {
    this.countSubscription$.unsubscribe();
  }

  private setStep(): void {
    console.log("#setStep start!");

    if (this.isStartNonsan()) {
      this.step = 'START';
      if(this.isEndNonsan()) {
        this.step = 'END'
      }
    }
     else {
      this.step = 'NORMAL'
     }
  }

  private setTopMessage(): void {
    console.log("#setTopMessage start!");

    switch(this.step) {
      case "START" : this.topMessage = '지금은 훈련중! 영서 수료식까지'; break;
      case "END" : this.topMessage = '드디어..'; break;
      case "NORMAL" : this.topMessage = '김영서 훈련소 입영까지'; break;
    }

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
    console.log("#isStartNonsan start!");
    return (this.isOverTime(this.startTime) ? true : false);
  }

  private isEndNonsan() {
    return (this.isOverTime(this.endTime) ? true : false);
  }


  get startTime(): Date { return new Date(2020, 2, 26, 14) }
  get endTime(): Date  { return new Date(2020, 3, 23, 14) }

  ngOnDestroy(): void {
    this.stop();
  }

  testTenCount() {
    console.log("#testTenCount start!");

    this.startAt  = 10;
  }
}



