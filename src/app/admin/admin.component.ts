import { AdminAuthService } from '../admin-auth.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProduitCommanderListComponent } from '../produit/produit-commander/produit-commander-list/produit-commander-list.component'
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit{
  loginUsername:string = '';
  loginPassword:string = '';
  username:string = '';
  password:string = '';
  connexion: boolean = true;
  inscription: boolean = false;
  constructor(private authService: AdminAuthService, private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService) {

  }

  ngOnInit(): void {
  }

  login(): void {
    const success = this.authService.login(this.loginUsername, this.loginPassword);
    if (success) {
      console.log('Connexion réussie !');
      this.router.navigate(['/']);
    } else {
      console.log('Identifiants incorrects.');
    }
  }

  register(): void {
    const success = this.authService.register(this.username, this.password);
    if (success) {
      console.log('Inscription réussie !');
      this.connexionForm();
    } else {
      console.log('L\'utilisateur existe déjà.');
    }
  }

  connexionForm(){
    this.connexion = true;
    this.inscription = false;
  }

  InscriptionForm(){
    this.connexion = false;
    this.inscription = true;
  }
}
