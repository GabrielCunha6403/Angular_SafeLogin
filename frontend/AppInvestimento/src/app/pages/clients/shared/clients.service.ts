import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private httpClient: HttpClient) {}

  listAll(): Observable<Client[]> {
    const url = `${environment.baseUrl}/clients`;

    return this.httpClient.get(url).pipe(map(this.mapToClients));
  }

  private mapToClients(data: any): Array<Client> {
    const listClients: Client[] = [];

    data.forEach((element: any) =>
      listClients.push(Object.assign(new Client(), element))
    );

    return listClients;
  }
}
