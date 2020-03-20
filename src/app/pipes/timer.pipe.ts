import { Pipe, PipeTransform } from '@angular/core';
import { Timer } from '../models/timer.model';
@Pipe({
  name: 'timerFormat'
})

export class TimerPipe implements PipeTransform {

  transform(value: Timer, ...args: any[]) {
    return `${value.days}일 ${value.hours}시간 ${value.minutes}분 ${value.seconds}초`;
  }


}