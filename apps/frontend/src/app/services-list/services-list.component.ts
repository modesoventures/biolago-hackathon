import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IListItem } from '../interfaces/list-items.interface';

@Component({
  selector: 'list-component',
  templateUrl: 'services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list: IListItem[] = [
    {
      id: '0',
      name: 'test1',
      action: () => {
        console.log('test1');
      },
    },
  ];

  @Input() selectedId?: string;
  @Output() selectItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSelect() {
    this.selectItem.emit(this.selectedId);
  }

}
