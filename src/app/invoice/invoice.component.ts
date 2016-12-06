import {
  Component, OnInit, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location } from '@angular/common';
import { InvoiceService, SortType } from '../invoice.service';
import { ErrorService } from '../error.service';
import { PaginationService } from '../pagination.service';
import { Invoice } from '../model';
import * as moment from 'moment';

const TITLE_NEW = 'New';
const TITLE_ISSUED = 'Issued';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [
    trigger('navigationState', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class InvoiceComponent implements OnInit {

  currentDate: string;
  loading: boolean = false;
  invoices: Invoice[] = [];
  isCurrent: boolean;
  isReadOnly: boolean;
  isCollapsed: boolean = true;
  title: string;

  // pagination
  currentPage: number = 1;
  maxSize: number = 4;
  numberItemPerPage: number = 4;
  currentResults: Invoice[] = [];

  // animating 
  navigationState = true;

  constructor(private invoiceService: InvoiceService,
    private paginationService: PaginationService,
    private location: Location,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.currentDate = moment().format('DD-MM-YYYY');
    this.issued();

    if(this.isReadOnly) {
      this.title = TITLE_ISSUED;
    } else {
      this.title = TITLE_NEW;
    }
  }

  produce() {
    this.title = TITLE_NEW;
    this.currentPage = 1;
    this.isReadOnly = false;
    this.loading = true;
    this.invoiceService.produce().subscribe(res => {
      console.log(res);
      this.invoices = this.sortByDate(res);
      this.currentResults = this.paginationService.subList(this.invoices, this.currentPage, this.numberItemPerPage);
      this.loading = false;
    }, err => {
      this.currentResults = [];
      this.isCurrent = true;
      this.loading = false;
    });
  }

  issued() {
    this.title = TITLE_ISSUED;
    this.currentPage = 1;
    this.isReadOnly = true;
    this.loading = true;
    this.invoiceService.fetch().subscribe(invoices => {
      this.invoices = invoices.map(i => {
        let invoice = i;
        invoice.amount = (i.amount.toString().includes('.')) ? `£${i.amount}` : `£${i.amount}.00`;
        return invoice;
      });
      this.currentResults = this.paginationService.subList(this.invoices, this.currentPage, this.numberItemPerPage);
      this.loading = false;
    }, err => {
      this.currentResults = this.paginationService.subList(this.invoices, this.currentPage, this.numberItemPerPage);
      this.loading = false;
      this.errorService.handleError(err);
    });
  }

  markAsIssued(event: Invoice) {
    this.produce();
  }

  backClicked() {
    this.location.back();
  }

  // pagination
  pageChanged(event: any): void {
    this.currentResults = 
      this.paginationService.subList(this.invoices, event.page, event.itemsPerPage);
  }

  private sortByDate(input) {
    return input.sort((a, b) => {
      let c1 = moment(a.rotaItem.supportDate, 'YYYY-MM-DD').date().valueOf();
      let c2 = moment(b.rotaItem.supportDate, 'YYYY-MM-DD').date().valueOf();
      if (c1 === c2) return 0;
      if (c1 > c2) return 1;
      if (c1 < c2) return -1;
    });
  }
}

