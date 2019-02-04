import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hbFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((item) => {
      const tmp = Object.assign({}, item);
      tmp[field] = `${tmp[field]}`;

      if (field === 'category') {
        tmp[field] = tmp['name'];
      }

      return tmp[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
