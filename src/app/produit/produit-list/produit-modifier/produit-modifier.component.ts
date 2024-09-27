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
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-produit-modifier',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterModule, CommonModule, HttpClientModule],
  templateUrl: './produit-modifier.component.html',
  styleUrl: './produit-modifier.component.css'
})
export class ProduitModifierComponent implements OnInit {
  classroomForm: FormGroup;
  produitId: number = 0;
  fournisseurs: Fournisseur[] = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private produitService: ProduitService,
    private produitListComponent: ProduitListComponent,
    private fournisseurService: FournisseurService
  ) {
    this.classroomForm = this.fb.group({
      id_salle: ['', Validators.required],
      nom_salle: ['', Validators.required],
      capacite: ['', Validators.required],
      equipements: ['', Validators.required],
      localisation: ['', Validators.required],
      libre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.fournisseurs = this.fournisseurService.getFournisseurs();
    this.produitId = this.produitService.getSelectedProduitId();
    const classroom = this.produitService.getProduitById(this.produitId);

    if (classroom) {
      this.classroomForm.patchValue({
        id_salle: classroom.id_salle,
        nom_salle: classroom.nom_salle,
        capacite: classroom.capacite,
        equipements: classroom.equipements,
        localisation: classroom.localisation,
        libre: classroom.libre,
      });
    }
  }

  modifierProduit() {
    this.updateProduit();
    this.router.navigate(['/produit-list']);
  }

  updateProduit() {
    const id_salle = this.produitId;
    const nom_salle = this.classroomForm.value.nom_salle;
    const capacite = this.classroomForm.value.capacite;
    const equipements = this.classroomForm.value.equipements;
    const localisation = this.classroomForm.value.localisation;
    const libre = this.classroomForm.value.libre;

    if (!nom_salle || !capacite || !equipements || !localisation ) {
      alert("Current username is required");
      return;
    }

    const formData = new FormData();
    formData.append("id_salle", id_salle.toString());
    if (nom_salle) formData.append("nom_salle", nom_salle);
    if (capacite) formData.append("capacite", capacite);
    if (equipements) formData.append("equipements", equipements);
    if (localisation) formData.append("localisation", localisation);
    if (libre !== undefined) formData.append("libre", libre);

    this.http.post(this.APIUrl + 'UpdateClassrooms', formData).subscribe(
      data => {
        alert('Classroom updated successfully');
        this.router.navigate(['/produit-list']);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  isLibreChecked(): boolean {
    const libreControl = this.classroomForm.get('libre');
    return libreControl ? libreControl.value : false;
  }

  onLibreChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.classroomForm.get('libre')?.setValue(input.checked);
  }
}

