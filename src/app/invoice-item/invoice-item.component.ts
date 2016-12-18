import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Invoice } from '../model';
import { InvoiceService } from '../invoice.service';
import { ErrorService } from '../error.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit {

  @Input() invoice;
  @Output() updatedInvoice: EventEmitter<any> = new EventEmitter();

  updated: string;

  constructor(private invoiceService: InvoiceService, private errorService: ErrorService) { }

  ngOnInit() {
    this.updated = moment().format('D-MM-YYYY');
  }

  submit(invoice: Invoice) {
    this.invoiceService.update(invoice).subscribe(res => {
      this.updatedInvoice.emit(invoice);
    }, err => this.errorService.handleError(err));
  }

}
