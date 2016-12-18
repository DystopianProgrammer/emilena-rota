import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { RotaService } from '../rota.service';

class Unallocated {
  forename: string;
  surname: string;
  days: string;
  personType: string;
}

@Component({
  selector: 'app-allocation-modal',
  templateUrl: './allocation-modal.component.html',
  styleUrls: ['./allocation-modal.component.scss']
})
export class AllocationModalComponent implements OnInit {

  @ViewChild('lgModal') public childModal: ModalDirective;
  @Input() rotaId;

  unallocated: Unallocated[] = [];

  constructor(private rotaService: RotaService) { }

  ngOnInit() { }

  public showChildModal(): void {
    this.unallocated = [];
    this.childModal.show();
    this.rotaService.findUnallocated(this.rotaId).subscribe(res => {
      res.forEach(person => {
        let availabilities = [];
        person.availabilities.forEach(a => {
          availabilities.push(a.dayOfWeek);
        });

        let unallocated = new Unallocated();
        unallocated.forename = person.forename;
        unallocated.surname = person.surname;
        unallocated.personType = person.personType;
        unallocated.days = availabilities
          .filter((item, pos) => availabilities.indexOf(item) == pos)
          .join(', ')
          .toLowerCase();

        this.unallocated.push(unallocated);
      })
    }, error => {
      // TODO - do nothing for now
    });
  }

  public hideChildModal(): void {
    this.unallocated = undefined;
    this.childModal.hide();
  }
}
