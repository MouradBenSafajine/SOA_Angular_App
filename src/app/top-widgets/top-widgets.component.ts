import { Component, OnInit } from '@angular/core';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import Client from '../model/clients';
import { ClientsService } from '../services/clients.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit {
  chiffreAffairesClients$: Observable<Client[]> | undefined;
  nombreTotalClients$: Observable<number> | undefined;
  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    // Exemple d'appel à certaines méthodes du service ClientsService
    this.nombreTotalClients$ = this.clientsService.countAllClients();
  }
}
