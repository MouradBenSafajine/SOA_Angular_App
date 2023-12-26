import { Component, OnInit } from '@angular/core';
import Client from '../model/clients';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Array<Client> = [];
  clientCourant = new Client();
  modeEdition = false;
  searchTerm = '';

  constructor(private clientsService: ClientsService, private router: Router) {}

  ngOnInit(): void {
    // Charge tous les clients par défaut
    this.chargerTousLesClients(); // Met à jour le statut des clients lorsque le composant est initialisé
  }

  editClient(c: Client) {
    this.clientCourant.id = c.id;
    this.clientCourant.nom = c.nom;
    this.clientCourant.prenom = c.prenom;
    this.clientCourant.numero = c.numero;
    this.clientCourant.adresse = c.adresse;
    this.clientCourant.email = c.email;
    this.clientCourant.actif = c.actif;
    this.clientCourant.chiffreAffaires = c.chiffreAffaires;
    this.clientCourant.dateInscription = c.dateInscription;

    this.modeEdition = true;
  }

  validateForm(form: NgForm) {
    console.log(form.value);
    let isNew: boolean = true;
    let index = 0;
    do {
      let c = this.clients[index];
      console.log(
        c.nom + ': ' +
        c.prenom);
      if (c.id == form.value.id) {
        isNew = false;
        console.log('Client existant');
        let response: boolean = confirm("Client existant. Confirmez-vous la mise à jour pour : " + c.nom + "?");
        if (response) {
          this.updateClient(form.value, c);
          this.modeEdition = false;
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      } else {
        index++;
      }
    } while (isNew && index < this.clients.length);
  }

  updateClient(updated: Client, current: Client) {
    this.clientsService.updateClient(current.id, updated)
      .subscribe({
        next: modifiedClient => {
          console.log("Mise à jour réussie");
          current.nom = updated.nom;
          current.prenom = updated.prenom;
          current.numero = updated.numero;
          current.adresse = updated.adresse;
          current.email = updated.email;
          current.actif = updated.actif;
          current.chiffreAffaires = updated.chiffreAffaires;
          current.dateInscription = updated.dateInscription;

          console.log('Mise à jour du client : ' + current.nom);
        },
        error: err => {
          console.log("Erreur lors de la mise à jour");
        }
      });
  }

  updateActifStatus() {
    const currentYear = new Date().getUTCFullYear();
    this.clients.forEach((client) => {
      const yearOfInscription = new Date().getUTCFullYear();
      client.actif = yearOfInscription === currentYear;
    });
  }

  deleteClient(c: Client) {
    let response: boolean = confirm("Voulez-vous supprimer le client : " + c.nom + "?");
    if (response) {
      this.clientsService.deleteClient(c.id)
        .subscribe({
          next: () => {
            const index: number = this.clients.indexOf(c);
            if (index !== -1) {
              this.clients.splice(index, 1);
              console.log("Suppression du client : " + c.nom);

              // Recharge la route actuelle (actualise la page)
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.navigate([this.router.url]);
            } else {
              console.log("Client introuvable dans le tableau local.");
            }
          },
          error: err => {
            console.log("Erreur lors de la suppression", err);
          }
        });
    } else {
      console.log("Suppression annulée.");
    }
  }

  filterClients(actif: boolean) {
    if (actif) {
      // Filtrer les clients actifs
      this.clients = this.clients.filter((client) => client.actif === true);
    } else {
      // Filtrer les clients inactifs
      this.clients = this.clients.filter((client) => client.actif === false);
    }
  }

  chargerTousLesClients() {
    this.clientsService.getClients()
      .subscribe({
        next: clients => {
          this.clients = clients;
          console.log("Chargement de tous les clients réussi.");
          this.updateActifStatus(); // Met à jour le statut actif/inactif des clients après chargement
        },
        error: err => {
          console.error("Erreur lors du chargement des clients:", err);
        }
      });
  }
}
