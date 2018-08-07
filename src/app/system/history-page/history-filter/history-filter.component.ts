import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'hb-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Input() categories: Category[] = [];

  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriod = [
    {type: 'd', label: 'В этот день'},
    {type: 'w', label: 'На этой неделе'},
    {type: 'M', label: 'В этом месяце'}
  ];

  types = [
    {type: 'outcome', label: 'Расход'},
    {type: 'income', label: 'Доход'}
  ];

  constructor() { }


  private calculateInputParams(field: string, isChecked: boolean, value: string): void {
    if (isChecked) {
      if (this[field].indexOf(value) === -1) {
        this[field].push(value);
      }
    } else {
      this[field] = this[field].filter((el) => el !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.filterCancel.emit();
  }

  applyFilter() {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}
