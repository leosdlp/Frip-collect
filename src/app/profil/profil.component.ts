import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from '../accueil/accueil.component'
import { FournisseurComponent } from '../fournisseur/fournisseur.component'
import { ProduitComponent } from '../produit/produit.component'
import { ProduitListComponent } from '../produit/produit-list/produit-list.component'
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AccueilComponent,FournisseurComponent, ProduitComponent, ProduitListComponent, CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user = localStorage.getItem('currentUser');
  userJson = "";
  nouveauNom:string= "";
  nouveauMdp:string= "";
  username:string = "";
  password:string = "";

  constructor(private router: Router, private authService: AdminAuthService){

  }

  ngOnInit(): void {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.username = currentUser.username;
      this.password = currentUser.password;
      this.nouveauNom = this.username;

    }
  }

  deconnect(): void{
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  deleteUser(){
    this.authService.deleteUser(this.username, this.password);
    this.router.navigate(['/']);
  }

  modifierNom(){
    this.authService.modifierUsername(this.nouveauNom);
  }

  modifierMdp(){
    this.authService.modifierPassword(this.nouveauMdp);
  }

  isAdmin(): boolean {
    return !(this.authService.isAdmin());
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
