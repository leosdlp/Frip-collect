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
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminAuthService } from '../admin-auth.service';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit{
  panierList: { [key: string]: Produit } = {};
  productsTemp:any = [];
  totalPanier:number= 0;
  panierTemp: any;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AdminAuthService, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private produitCommanderListComponent: ProduitCommanderListComponent, private panierService: PanierService, private commandeService: CommandeService){

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
    this.updatePanier();
  }

  commander(){
    if(this.panierList){
      this.addCommandes();
    }
  }

  addCommandes() {
    const products = Object.keys(this.panierList).map(key => {
      const produit = this.panierList[key];
      return {
        id: produit.id,
        nom: produit.nom,
        nombre: produit.nombre,
        type: produit.type,
        taille: produit.taille,
        genre: produit.genre,
        etat: produit.etat,
        fournisseur: produit.fournisseur,
        prix: produit.prix,
      };
    });

    const totalPrice = this.totalPanier.toFixed(2);
    const username = this.authService.getUsername();

    if (!products.length || !totalPrice || !username) {
      alert("Products, TotalPrice and Username are required");
      return;
    }

    const formData = new FormData();
    formData.append("products", JSON.stringify(products));
    formData.append("totalPrice", totalPrice);
    formData.append("username", username);

    this.http.post(this.APIUrl + 'AddCommandes', formData).subscribe(data => {
      alert(data);
    }, error => {
      console.error('Error adding produit:', error);
      alert(`Error adding produit: ${error.message || error}`);
    });
  }
}
