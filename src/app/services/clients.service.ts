import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Client from '../model/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:8081/clients/';

  constructor(private http: HttpClient) {}




  countAllClients(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}count`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération du nombre total de clients :', error);
        return throwError(error);
      })
    );
  }

  searchClientsWithChiffreAffaires(nom: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}searchWithChiffreAffaires?nom=${nom}`).pipe(
      catchError(error => {
        console.error('Search Clients With Chiffre Affaires Error:', error);
        return throwError(error);
      })
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('GET Clients Error:', error);
        return throwError(error);
      })
    );
  }

  getClientsWithActifStatus(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}statutActivite`).pipe(
      catchError(error => {
        console.error('GET Clients With Actif Status Error:', error);
        return throwError(error);
      })
    );
  }

  addClient(newClient: Client): Observable<Client[]> {
    return this.http.post<Client[]>(this.apiUrl, newClient).pipe(
      catchError(error => {
        console.error('Add Client Error:', error);
        return throwError(error);
      })
    );
  }

  updateClient(id: number | undefined, updatedClient: Client): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedClient).pipe(
      catchError(error => {
        console.error('Update Client Error:', error);
        return throwError(error);
      })
    );
  }

  deleteClient(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}delete/${id}`).pipe(
      catchError(error => {
        console.error('Delete Client Error:', error);
        return throwError(error);
      })
    );
  }

  searchClientsByName(nom: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?nom=${nom}`).pipe(
      catchError(error => {
        console.error('Search Clients By Name Error:', error);
        return throwError(error);
      })
    );
  }

  getActiveClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/actif`).pipe(
      catchError(error => {
        console.error('GET Active Clients Error:', error);
        return throwError(error);
      })
    );
  }

  getInactiveClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/inactif`).pipe(
      catchError(error => {
        console.error('GET Inactive Clients Error:', error);
        return throwError(error);
      })
    );
  }

  getClientsWithChiffreAffaires(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}clientsWithChiffreAffaires`).pipe(
      catchError(error => {
        console.error('GET Clients With Chiffre Affaires Error:', error);
        return throwError(error);
      })
    );
  }
}
