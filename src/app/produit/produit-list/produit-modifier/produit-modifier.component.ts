import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../../produit.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProduitListComponent } from '../../produit-list/produit-list.component';
import { Router } from '@angular/router';
import { FournisseurService } from '../../../fournisseur.service';
import { Fournisseur } from '../../../fournisseur.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-produit-modifier',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule, CommonModule],
  templateUrl: './produit-modifier.component.html',
  styleUrl: './produit-modifier.component.css'
})
export class ProduitModifierComponent implements OnInit {
  produitForm: FormGroup;
  produitId: number = 0;
  fournisseurs: Fournisseur[] = [];

  constructor(private fb: FormBuilder, private router: Router, private produitService: ProduitService, private produitListComponent: ProduitListComponent, private fournisseurService: FournisseurService) {
    this.produitForm = this.fb.group({
      id:[],
      nom: [''],
      type: [''],
      genre: [''],
      taille: [''],
      prix: [],
      etat: [''],
      fournisseur: [''],
      nombre: [],
    });
  }

  ngOnInit(): void {
    this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.produitId = this.produitService.getSelectedProduitId();
    const produit = this.produitService.getProduitById(this.produitId);

    if (produit) {
      this.produitForm.patchValue({
        id: produit.id,
        nom: produit.nom,
        type: produit.type,
        genre: produit.genre,
        taille: produit.taille,
        prix: produit.prix,
        etat: produit.etat,
        fournisseur: produit.fournisseur,
        nombre: produit.nombre
      });
    }
  }

  modifierProduit() {
    const produitModifie = this.produitForm.value;
    this.produitService.updateProduit(this.produitId, produitModifie);
  }
}

