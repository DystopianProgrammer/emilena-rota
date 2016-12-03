import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Invoice } from '../model';
import { InvoiceService } from '../invoice.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {

  @Input() invoice;
  @Output() updatedInvoice: EventEmitter<any> = new EventEmitter();

  constructor(private invoiceService: InvoiceService, private errorService: ErrorService) { }

  ngOnInit() {
  }

  submit(invoice: Invoice) {
    this.invoiceService.update(invoice).subscribe(res => {
      this.updatedInvoice.emit(invoice);
    }, err => this.errorService.handleError(err));
  }

}
