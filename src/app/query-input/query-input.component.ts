import { Component, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent
} from "@angular/material";
import { DataService } from "../data.service";
import * as moment from "moment";

@Component({
  selector: "query-input",
  templateUrl: "./query-input.component.html",
  styleUrls: ["./query-input.component.scss"],
  providers: [DataService]
})
export class QueryInputComponent {
  dataSource: MatTableDataSource<TickerData>;
  totalCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource([]);
  }

  displayedColumns = ["ticker", "buyDate"];

  // Query object that will be sent to API
  private query = {
    pageSize: 0,
    pageIndex: 0,
    minDate: "",
    maxDate: ""
  };

  ngAfterViewInit() {
    // set initial query values to paginator properties
    this.query.pageSize = this.paginator.pageSize;
    this.query.pageIndex = this.paginator.pageIndex;
  }

  // when changing page size or clicking next/previous, set pagination values execute query
  pageHandler(pageEvent: PageEvent) {
    this.query.pageSize = pageEvent.pageSize;
    this.query.pageIndex = pageEvent.pageIndex;
    this.getData();
  }

  dateChangeMin(type, event) {
    if (event.value) {
      this.query.minDate = moment(event.value).format("YYYY-MM-DD hh:mm:ss");
      this.getData();
    }
  }

  dateChangeMax(type, event) {
    if (event.value) {
      this.query.maxDate = moment(event.value).format("YYYY-MM-DD hh:mm:ss");
      this.getData();
    }
  }

  getData = () => {
    this.dataService
      .getGolenCrossData(this.query)
      .subscribe((response: Result) => {
        this.dataSource.data = response.goldenCrosses;
        this.totalCount = response.totalCount;
      });
  };
}

// Interfaces for result
// TODO - put this models directory
export interface TickerData {
  ticker: string;
  buyDate: string;
}

export interface Result {
  goldenCrosses: [];
  totalCount: 0;
}
