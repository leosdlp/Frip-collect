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
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  standalone:true,
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule,FormsModule, ProduitListComponent, CommonModule, HttpClientModule],
})
export class ProduitComponent implements OnInit {
  classroomForm!: FormGroup;
  fournisseurs: Fournisseur[] = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  classroomsTemp: any = [];

  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private http: HttpClient) {}

  ngOnInit() {
    // this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.classroomForm = this.fb.group({
      id_salle: [, Validators.required],
      nom_salle: ['', Validators.required],
      capacite: ['', Validators.required],
      equipements: [''],
      localisation: ['', Validators.required],
      libre: true
    });
  }
  selectedItemFormControl = new FormControl();

  ajouterSalle() {
    this.addClassrooms();
    this.classroomForm.reset();
  }

  addClassrooms() {
    const nom_salle = this.classroomForm.value.nom_salle;
    const capacite = this.classroomForm.value.capacite;
    const equipements = this.classroomForm.value.equipements;
    const localisation = this.classroomForm.value.localisation;
    const libre = this.classroomForm.value.libre;

    if (!nom_salle || !capacite || !equipements || !localisation) {
      alert("id_salle, nom_salle, capacite, equipementsand localisation are required");
      return;
    }

    const formData = new FormData();
    formData.append("nom_salle", nom_salle);
    formData.append("capacite", capacite);
    formData.append("equipements", equipements);
    formData.append("localisation", localisation);
    formData.append("libre", libre);

    this.http.post(this.APIUrl + 'AddClassrooms', formData).subscribe(data => {
      alert(data);
    }, error => {
      console.error('Error adding produit:', error);
      alert(`Error adding produit: ${error.message || error}`);
    });

    this.refreshProduits();
  }


  refreshProduits() {
    this.http.get(this.APIUrl + 'GetClassrooms').subscribe(data => {
      this.produitService.classroomsTemp = data;
      this.classroomsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }
}
