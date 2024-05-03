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
import { CommandeService } from '../commande.service';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit{
  panierList: { [key: string]: Produit } = {};
  totalPanier:number= 0;

  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService, private commandeService: CommandeService){

  }

  ngOnInit(): void {
    this.panierList = this.panierService.getPanier();
    this.updatePanier();
  }

  updatePanier() {
    this.totalPanier = 0;
    for (const produit of Object.values(this.panierList)) {
      this.totalPanier += produit.prix * produit.nombre;
    }
  }

  ajouterPanier(produit: Produit ): void {
    this.panierService.ajouterAuPanier(produit);
    this.updatePanier();
  }
  supprimerPanier(produit: Produit ): void {
    this.panierService.supprimerPanier(produit);
    console.log(this.panierList)
    this.updatePanier();
  }

  commander(){
    if(this.panierList){
      this.commandeService.ajouterCommande(this.panierList);
    }
  }

}
