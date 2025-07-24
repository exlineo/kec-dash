import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): number {
    return new Date(value).getTime();
  }

}
@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: number | Date): string {
    return new Date(value).toLocaleDateString("fr-FR")
  }

}