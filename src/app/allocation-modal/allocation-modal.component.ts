import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { RotaService } from '../rota.service';

@Component({
  selector: 'app-allocation-modal',
  templateUrl: './allocation-modal.component.html',
  styleUrls: ['./allocation-modal.component.css']
})
export class AllocationModalComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;
  @Input() rotaId;

  unallocated: any[] = [];

  constructor(private rotaService: RotaService) { }

  ngOnInit() {}

  public showChildModal(): void {
    this.childModal.show();
    this.rotaService.findUnallocated(this.rotaId).subscribe(res => {
      this.unallocated = res;
    }, error => {
      // TODO - do nothing for now
    });
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }
}
