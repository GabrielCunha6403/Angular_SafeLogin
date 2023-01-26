import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/client.model';
import { ClientsService } from '../shared/clients.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  public listClient: Array<Client> = [];

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.clientService.listAll().subscribe((listClient) => {
      this.listClient = listClient;
    })
  }

  public removerClient(id: any){
    console.log("remover client de id: ", id);
  }

}
