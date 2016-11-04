import { Component, OnInit } from '@angular/core';
import { RotaService } from '../rota.service';
import { Rota } from '../model';
import * as moment from 'moment';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  rota: Rota;

  constructor(private rotaService: RotaService) { }

  ngOnInit() {
    this.rotaService.rotaForWeek('25-09-2016').subscribe(rota => {
      this.rota = rota;
    });
  }
}

