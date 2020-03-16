import { Component, ViewChild, OnInit } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { read } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hello-nonsan';

  @ViewChild('counter', {
    read: CounterComponent,
    static: true
  })
  private counter: CounterComponent;

  ngOnInit(): void {
    this.counter.start();
    this.counter.counterState.subscribe(state => {
      if (state === 'COMPLETE') {
        alert('Done!');
        this.counter.stop();
      }
    });
  }


}
