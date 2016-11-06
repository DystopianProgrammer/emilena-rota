import { Component, OnInit } from '@angular/core';
import { RotaService } from '../rota.service';
import * as moment from 'moment';

@Component({
  selector: 'app-rota',
  templateUrl: './rota.component.html',
  styleUrls: ['./rota.component.css']
})
export class RotaComponent implements OnInit {

  constructor(private rotaService: RotaService) { }

  ngOnInit() { }
}

