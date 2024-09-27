import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../fournisseur.model';
import { User } from '../../user.model';
import { CommonModule } from '@angular/common';
import { FournisseurService } from '../../fournisseur.service';
import { AdminAuthService } from '../../admin-auth.service';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  templateUrl: './fournisseur-list.component.html',
  styleUrl: './fournisseur-list.component.css',
  imports: [CommonModule,RouterOutlet,RouterModule, FormsModule, HttpClientModule],
})

export class FournisseurListComponent implements OnInit {
  users: User[] = [];
  rechercheUser = '';
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  usersTemp: any = [];

  constructor(private fournisseurService: FournisseurService, private router: Router, private http: HttpClient, private authService: AdminAuthService) {
  }

  ngOnInit(): void {
    this.refreshFournisseurs();
    this.users = this.authService.getUsers();
  }

  filtrerFournisseurs() {
    if (this.rechercheUser === '') {
      this.users = this.authService.getUsers();
    } else {
      this.users = this.authService.getUsers().filter(user =>
        user.username.toLowerCase().includes(this.rechercheUser.toLowerCase())
      );
    }
  }

  // modifierFournisseur(id: number) {
  //   this.fournisseurService.setSelectedFournisseurId(id);
  //   this.router.navigate(['/fournisseur-modifier', id]);
  // }

  // supprimerFournisseur(id: number) {
  //   this.fournisseurService.deleteFournisseur(id);
  //   this.deleteUsers(id);
  //   this.refreshFournisseurs();
  //   this.filtrerFournisseurs();
  // }

  refreshFournisseurs() {
    this.http.get(this.APIUrl + 'GetUsers').subscribe(data => {
      this.authService.usersTemp = data;
      this.usersTemp = data;
    });
    this.authService.setApiUsers();
    this.authService.getUsers();
  }

  // deleteUsers(id:any){
  //   this.http.delete(this.APIUrl+'DeleteFournisseurs?id='+id).subscribe(data=>{
  //     alert(data);
  //     })
  //   this.refreshFournisseurs();
  // }
}
