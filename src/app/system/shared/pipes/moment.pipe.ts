import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'hbMoment'
})
export class MomentPipe implements PipeTransform {

  transform(date: string, formatIn: string, formatOut: string = 'DD.MM.YYYY'): string {
    return moment(date, formatIn).format(formatOut);
  }

}
