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
  styleUrls: ['./invoice.component.scss'],
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
  isCollapsed: boolean = false;
  title: string;

  currentResults: Invoice[] = [];

  // filter
  filterText: string;
  originalResults: Invoice[] = [];

  // animating 
  navigationState = true;

  constructor(private invoiceService: InvoiceService,
    private paginationService: PaginationService,
    private location: Location,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.currentDate = moment().format('DD-MM-YYYY');
    this.produce();

    if (this.isReadOnly) {
      this.title = TITLE_ISSUED;
    } else {
      this.title = TITLE_NEW;
    }
  }

  produce() {
    this.title = TITLE_NEW;
    this.isReadOnly = false;
    this.loading = true;

    let produceCB = () => {
      this.invoiceService.produce().subscribe(res => {
        this.invoices = this.sortByDate(res);
        this.currentResults = res;
        this.originalResults = this.currentResults.slice();
        this.loading = false;
      }, err => {
        this.currentResults = [];
        this.isCurrent = true;
        this.loading = false;
      });
    }

    setTimeout(produceCB, 300);
  }

  issued() {
    this.title = TITLE_ISSUED;
    this.isReadOnly = true;
    this.loading = true;

    let fetchCB = () => {
      this.invoiceService.fetch().subscribe(invoices => {
        this.invoices = invoices.map(i => {
          let invoice = i;
          invoice.amount = (i.amount.toString().includes('.')) ? `£${i.amount}` : `£${i.amount}.00`;
          return invoice;
        });
        this.currentResults = invoices;
        this.loading = false;
      }, err => {
        this.loading = false;
        this.errorService.handleError(err);
      });
    }

    setTimeout(fetchCB, 300);
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

  // track the state of the filter text
  private indexOf: number = 0

  onChange(event) {
    if (this.indexOf < event.length) {
      this.indexOf = event.length;
    } else {
      this.currentResults = this.originalResults.slice();
    }

    this.currentResults = this.currentResults.filter(i => {
      let forename = i.rotaItem.client.forename.toLowerCase();
      let surname = i.rotaItem.client.surname.toLowerCase();
      let searchText = event.toLowerCase();

      return forename.includes(event) || surname.includes(event);
    });
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

