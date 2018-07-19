import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hbFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    const res = items.filter((item) => {
      const tmp = Object.assign({}, item);
      tmp[field] = `${tmp[field]}`;

      // if (field === 'type') {
      //   tmp[field] = tmp[field] === 'income' ? 'доход' : 'расход';
      // }

      if (field === 'category') {
        tmp[field] = tmp['name'];
      }

      return tmp[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    return res;
  }
}
