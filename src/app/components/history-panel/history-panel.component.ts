import { outputAst } from '@angular/compiler';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/services/device.service';
import { DeviceEvent } from 'src/app/services/event.service';

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrls: ['./history-panel.component.css']
})
export class HistoryPanelComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data: DeviceEvent[] = [];
  @Input() viewedDevice = new Device();
  @Output() showAllEmitter = new EventEmitter();
  @Output() changeDateRangeEmitter = new EventEmitter<string>();
  dataSource = new MatTableDataSource<DeviceEvent>(this.data);

  @ViewChild("paginator") paginator: MatPaginator;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(){

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<DeviceEvent>(this.data);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
  }

  dateRangeChange(startDate: any, endDate: any){
    this.changeDateRangeEmitter.emit(startDate.value+"-"+endDate.value);
    
  }
}
