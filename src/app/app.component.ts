import { Component, ViewChild, OnInit } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hello-nonsan';

  lastDay: Date;

  leftDay;
  @ViewChild('counter', {
    read: CounterComponent,
    static: true
  })
  private counter: CounterComponent;

  ngOnInit(): void {

    let today: Date = new Date();

    let goalDay: Date = new Date(2020, 2, 26, 14);

    let betweenDay = (goalDay.getTime() - today.getTime());

    this.counter.startAt = betweenDay / 1000;

    if (betweenDay <= 0) {
      this.counter.isDone = true;
      this.counter.currentValue = "훈련중";
      console.log("끝~~");
    } else {
      this.counter.start();
      this.counter.counterState.subscribe(state => {
        if (state === 'COMPLETE') {
          alert('Done!');
          this.counter.isDone = true;
          this.counter.stop();
        }
      });
    }




  }


}
