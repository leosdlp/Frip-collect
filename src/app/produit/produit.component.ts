import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../produit.service';
import { Produit } from '../produit.model';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProduitListComponent } from './produit-list/produit-list.component'
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  standalone:true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, ProduitListComponent, CommonModule],
})
export class ProduitComponent implements OnInit {
  produitForm!: FormGroup;
  fournisseurs: Fournisseur[] = [];

  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService) {}

  ngOnInit() {
    this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.produitForm = this.fb.group({
      id: [, Validators.required],
      nom: ['', Validators.required],
      type: ['', Validators.required],
      genre: ['', Validators.required],
      taille: ['', Validators.required],
      prix: [, Validators.min(0)],
      etat: ['', Validators.required],
      fournisseur: ['', Validators.required],
      nombre: [, Validators.required],
    });
  }
  selectedItemFormControl = new FormControl();

  ajouterProduit() {
    console.log(this.produitForm.value);
    const nouveauProduit: Produit = this.produitForm.value;
    this.produitService.createProduit(nouveauProduit);
    this.produitForm.reset();
  }
}
