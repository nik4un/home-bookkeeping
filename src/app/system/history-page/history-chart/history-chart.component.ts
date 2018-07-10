import { Component, Input  } from '@angular/core';

@Component({
  selector: 'hb-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {
  view = [545, 355]; // размер диаграммы

  @Input() data;

}
