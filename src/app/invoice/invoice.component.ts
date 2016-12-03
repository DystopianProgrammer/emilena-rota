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
import { Invoice } from '../model';
import * as moment from 'moment';

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
  // animating 
  navigationState = true;

  constructor(private invoiceService: InvoiceService,
    private location: Location,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.currentDate = moment().format('D/MM/YYYY');
    this.issued();
  }

  produce() {
    this.invoices = [];
    this.isReadOnly = false;
    this.loading = true;
    this.invoiceService.produce().subscribe(res => {
      this.invoices = this.sortByDate(res);
      this.loading = false;
    }, err => {
      this.isCurrent = true;
      this.loading = false;
    });
  }

  issued() {
    this.isReadOnly = true;
    this.loading = true;
    this.invoiceService.fetch().subscribe(invoices => {
      this.invoices = invoices.map(i => {
        let invoice = i;
        invoice.amount = (i.amount.toString().includes('.')) ? `£${i.amount}` : `£${i.amount}.00`;
        return invoice;
      });
      this.loading = false;
    }, err => {
      this.loading = false;
      this.errorService.handleError(err);
    });
  }

  removeInvoice(event: Invoice) {
    let index = this.invoices.findIndex(invoice => invoice.rotaItem.id === event.rotaItem.id);
    this.invoices.splice(index, 1);
  }

  backClicked() {
    this.location.back();
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

