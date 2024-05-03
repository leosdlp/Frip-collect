import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component'
import { FournisseurComponent } from './fournisseur/fournisseur.component'
import { ProduitComponent } from './produit/produit.component'
import { ProduitListComponent } from './produit/produit-list/produit-list.component'
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AccueilComponent,FournisseurComponent, ProduitComponent, ProduitListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'situation_1';
  appRoutes = routes;
  constructor(private router: Router, private authService: AdminAuthService){

  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}

