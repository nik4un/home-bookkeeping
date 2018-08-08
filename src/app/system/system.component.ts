import { Component, HostBinding } from '@angular/core';
import { fadeStateTrigger } from '../shared/animation/fade.animation';

@Component({
  selector: 'hb-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})
export class SystemComponent {
  @HostBinding('@fade') a = true;
}
